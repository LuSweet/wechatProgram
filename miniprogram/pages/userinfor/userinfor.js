// pages/userinfor/userinfor.js
const db=wx.cloud.database()
Page({

   /**
   * 页面的初始数据
   */
  data: {
  zhanghao:'',
   name:'',
   photo:'',
   id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let that=this
   let userinfo=wx.getStorageSync('userinfo');
   let id=userinfo._id
   if(!userinfo)
   {
     wx.showToast({
       title: '你还未登录！',
       icon:'error'
     })
   }
   
   else{
    db.collection('user_information').doc(id).get({
      success:function(res){
       console.log("已从数据库找到该数据",res)
       that.setData({
         zhanghao:res.data.userzhanghao,
         photo:res.data.userphoto,
         name:res.data.username,
         id:res.data._id
       })
      },
      fail:function(res){
       console.log("未从数据库找到该数据")
      }
    })
   }
 
  },

  /* 获取用户名 */
getyonghuming(e){
  this.setData({
    name:e.detail.value
   })
},


Deletephoto(e) {
  let that=this
  wx.showModal({
    title: '要删除这张头像吗？',
    content: '',
    cancelText: '取消',
    confirmText: '确定',
    success: res => {
      if (res.confirm) {
        that.setData({
          photo:''
        })
        wx.cloud.deleteFile({
          fileList:[e.currentTarget.dataset.src],
          success: res => {
           console.log(res.fileList)
          },
          fail: err => {
          }
        })
      }
    }
  })
  console.log(this.data.qupupic)
},




choosephoto(){
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: chooseResult => {
      // 将图片上传至云存储空间
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: 'user/' + new Date().getTime() + '.png',
        // 指定要上传的文件的小程序临时文件路径
        filePath: chooseResult.tempFilePaths[0],
        // 成功回调
        success: res => {
          console.log('上传成功', res.fileID)
          this.setData({
            photo:res.fileID
          })
        },
        fail: res => {
          //handle error
        }
      })
    },

  })
},

tochangeinfor(){
  let name = this.data.name
  let photo = this.data.photo
  let id=this.data.id
  if (!photo) {
    wx.showToast({
      icon: "none",
      title: '请选择头像图片'
    })
    return
  }
  if (!name) {
    wx.showToast({
      icon: "none",
      title: '请输入用户名'
    })
    return
  }
  wx.showModal({
    title: '你确定要修改吗？',
    content: '修改后信息将无法恢复！',
    cancelText: '取消',
    confirmText: '确定',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        db.collection('user_information').doc(id).update({
          data:{
            username:name,
            userphoto:photo,
          },
          success: res => {
            wx.showToast({
              title: '数据库更新成功',
              duration: 2000
            })
            // 在页面内 navigateBack，将返回管理总页面
            console.log('更新成功，跳转')
          wx.switchTab({
            url: '/pages/userb/userb',
          })
          },
          fail: res => {
            console.log("数据库上传失败")
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })


  


},




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  })
