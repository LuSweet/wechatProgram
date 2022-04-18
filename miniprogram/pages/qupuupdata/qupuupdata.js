// pages/qupuupdata/qupuupdata.js
const db=wx.cloud.database()
let VideoUrlExchange=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qupuname:"",//quming
    quputype:"",//type
    qupupic:[],  //qupupic
    fenmian:"",
    VideoUrl:"",
    VideoUrltwo:"",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     /* options用于接收路由跳转的query参数 */
     console.log(options)
     let qupuId=options.qupuId
     console.log(qupuId)
     let that=this
     db.collection('qupu').doc(qupuId).get({
       success:function(res){
          console.log('信息获取成功',res)
          that.setData({
            qupupic:res.data.qupupic,
            fenmian:res.data.src,
            quputype:res.data.songtype,
            qupuname:res.data.songname,
            VideoUrl:res.data.qupuvideo.video1,
            VideoUrltwo:res.data.qupuvideo.video2,
            id:qupuId
          })
       },
       fail:function(res){
         console.log('信息获取失败',res)
 
     }
   })

  },

  getquming(event){
    this.setData({
     qupuname:event.detail.value
    })
  },
  gettype(event){
    this.setData({
      quputype:event.detail.value
    })
  },

  
Choosefenmian(){
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: chooseResult => {
      // 将图片上传至云存储空间
      console.log('选择成功')
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: 'qupu/' + new Date().getTime() + '.png',
        // 指定要上传的文件的小程序临时文件路径
        filePath: chooseResult.tempFilePaths[0],
        // 成功回调
        success: res => {
          console.log('上传成功', res.fileID)
          this.setData({
            fenmian:res.fileID
          })
        },
        fail:res => {
          console.log('失败')
        }
      })
    },

  })
},

//删除封面
/* Deletefenmian(e) {
  wx.showModal({
    title: '要删除这张照片吗？',
    content: '',
    cancelText: '取消',
    confirmText: '确定',
    success: res => {
      if (res.confirm) {
    this.data.fenmian.splice(e.currentTarget.dataset.id, 1); 
        this.setData({
          fenmian: " "
        })
        wx.cloud.deleteFile({
          fileList:[e.currentTarget.dataset.src],
          success: res => {
           console.log('云存储删除成功')
          },
          fail: err => {
           console.log('云储存删除失败')
          }
        })
      }
    }
  })
  console.log(this.data.fenmian)
},
 */



ChooseImage2(){
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: chooseResult => {
      // 将图片上传至云存储空间
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: 'qupu/' + new Date().getTime() + '.png',
        // 指定要上传的文件的小程序临时文件路径
        filePath: chooseResult.tempFilePaths[0],
        // 成功回调
        success: res => {
          console.log('上传成功', res.fileID)
          this.setData({
            qupupic:this.data.qupupic.concat(res.fileID)
          })
        },
        fail: res => {
          //handle error
        }
      })
    },

  })
},

//删除图片
DeleteImg2(e) {
  wx.showModal({
    title: '要删除这张照片吗？',
    content: '',
    cancelText: '取消',
    confirmText: '确定',
    success: res => {
      if (res.confirm) {
        this.data.qupupic.splice(e.currentTarget.dataset.id, 1);
        this.setData({
          qupupic: this.data.qupupic
        })
        wx.cloud.deleteFile({
          fileList:[e.currentTarget.dataset.src],
          success: res => {
           //handle success
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


  /* 演示视频上传 */
  uploadVideo(){
    wx.chooseVideo({
      success: chooseResult => {
        // 将视频上传至云存储空间
        console.log("视频选择完成",chooseResult)
        console.log("上传中······")
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'qupu/' + new Date().getTime() + '.MP4',
          // 指定要上传的文件的小程序临时文件路径，也即刚刚选中的视频，所在开发工具中的临时位置
          filePath: chooseResult.tempFilePath,
          // 成功回调
          success: res => {
            console.log('上传成功，路径为：', res.fileID)
            VideoUrlExchange = res.fileID
            console.log(VideoUrlExchange)
            //2. 初始化视频数据
            this.setData({
              VideoUrl: VideoUrlExchange
            }) 
            }
        })
      }
    })
  },


  /* 教学视频上传 */
  uploadVideotwo(){
    wx.chooseVideo({
      success: chooseResult => {
        // 将视频上传至云存储空间
        console.log("视频选择完成",chooseResult)
        console.log("上传中······")
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'qupu/' + new Date().getTime() + '.MP4',
          // 指定要上传的文件的小程序临时文件路径，也即刚刚选中的视频，所在开发工具中的临时位置
          filePath: chooseResult.tempFilePath,
          // 成功回调
          success: res => {
            console.log('上传成功，路径为：', res.fileID)
            VideoUrlExchange = res.fileID
            console.log(VideoUrlExchange)
            //2. 初始化视频数据
            this.setData({
              VideoUrltwo: VideoUrlExchange
            }) 
            }
        })
      }
    })
  },

/*  更新该曲*/
  publish(){
    let quming = this.data.qupuname
    let type = this.data.quputype
    let fenmian=this.data.fenmian
    let video1=this.data.VideoUrl
    let video2=this.data.VideoUrltwo
    let  qupupic= this.data.qupupic
    if (!qupupic || qupupic.length < 1) {
      wx.showToast({
        icon: "none",
        title: '请选择图片'
      })
      return
    }
    db.collection('qupu').doc(this.data.id).update({
      data:{
        songname:quming,
        songtype:type,
        src:fenmian,
        qupupic:this.data.qupupic,
        qupuvideo:{video1,video2}
        /* qupuvideo:video1 */
      },
      success: res => {
        wx.showToast({
          title: '数据库上传成功',
          duration: 2000
        })
        // 在页面内 navigateBack，将返回管理总页面
        wx.redirectTo({
          url: '/pages/qupuorder/qupuorder',
        })
      },
      fail: res => {
        console.log("数据库上传失败")
      }
    })
  },



  /* 删除该曲 */
  deletequpu(){
  let that=this
  wx.showModal({
    title: '你确定要删除该曲吗？',
    content: '',
    cancelText: '取消',
    confirmText: '确定',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        db.collection('qupu').doc(that.data.id).remove({
          success:function(res){
            console.log("数据库删除成功",res)
            wx.cloud.deleteFile({
              fileList:[that.data.fenmian,that.data.VideoUrltwo,that.data.VideoUrl],
              success:res=>{
                console.log("封面、视频云储存删除成功",res.fileList)
              },
              fail:res=>{
                console.log("封面、视频云储存删除失败")
              }
            })
            wx.cloud.deleteFile({
              fileList:that.data.qupupic,
              success:res=>{
                console.log("曲谱云储存删除成功",res.fileList)
               wx.navigateBack({
                 delta: 1,
               })
              /*  ({
                 url: '/pages/qupuorder/qupuorder',
               }) */
              },
              fail:res=>{
                console.log("曲谱云储存删除失败")
              }
            }) 

          },
          fail:function(res){
            console.log("数据库删除失败")
          }
        })
      }  
      else if (res.cancel) {
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