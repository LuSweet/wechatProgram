// pages/manag_userdes/manag_userdes.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log(options.userid)
    let id=options.userid
    db.collection('timeline').where({
      'userinfo._id':id
   }).orderBy('createTime', 'desc') //按发布视频排序
  .get({
    success(res) {
      console.log("用户留言数据请求成功", res)
      that.setData({
        dataList: res.data,
      })
    },
    fail(res) {
      console.log("用户留言数据请求失败", res)
    }
  })

  },
 

  deleteliuyan(e){
    let that=this
    console.log(e.currentTarget.dataset.song)
    let id=e.currentTarget.dataset.song._id
    console.log(id)
    wx.showModal({
      title: '是否确定删除？',
      content: '请确定是否要删除，删除则无法恢复！',
      cancelText: '取消',
      confirmText: '确定',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name:'removeliuyan',
            data:{
              id:id
            }
          }).then(res => {
            console.log("该留言删除成功",res)
          
            db.collection('timeline').where({
              'userinfo._id':id
           }).orderBy('createTime', 'desc') //按发布视频排序
          .get({
            success(res) {
              console.log("用户留言数据请求成功", res)
              that.setData({
                dataList: res.data,
              })
            },
            fail(res) {
              console.log("用户留言数据请求失败", res)
            }
          })
            })
            .catch(res =>{
              console.log("删除失败",res)
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  

  },




  previewImg: function(e) {
    let imgData = e.currentTarget.dataset.img;
    console.log("eeee", imgData[0])
    console.log("图片s", imgData[1])
    wx.previewImage({
      //当前显示图片
      current: imgData[0],
      //所有图片
      urls: imgData[1]
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