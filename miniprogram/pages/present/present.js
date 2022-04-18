// pages/present/present.js
const db=wx.cloud.database()
Page({
  data: {
    quputupian:[],
    qupuname:'',
    quputype:'',
    qupuvideo:[],
    fenmian:'',
    yanShi:true,
    id:"",
    collectsign:''
  },

  tocollect(){
   let that=this
   let video1=that.data.qupuvideo.video1
   let video2=that.data.qupuvideo.video2
   let userinfo=wx.getStorageSync('userinfo');
   if(!userinfo)
   {
     wx.showToast({
       title: '你还未登录！',
       icon:'error'
     })
   }

   else{
   db.collection('collect').where({
     qupu_id:that.data.id
   }).get({
     success:function(res){
       console.log(res)
       if(res.data=="")
       {
        db.collection('collect').add({
          data:{
          songname:that.data.qupuname,
          songtype:that.data.quputype,
          src:that.data.fenmian,
          qupupic:that.data.quputupian,
          qupuvideo:{video1,video2},
          qupu_id:that.data.id,
          qupusign:"jiaru"
          },success:function(res){
            console.log('曲子加入收藏夹成功',res)
            db.collection('collect').where({
              qupu_id: that.data.id,
            }).get({
              success: function(res) {
                // res.data 是包含以上定义的两条记录的数组
                console.log("收藏中存在该曲子",res.data)
                that.setData({
                  collectsign:res.data[0].qupusign
                })
              }
            })

            wx.showToast({
              title: '已加入收藏夹!',
            })
          },fail:function(res){
            console.log('曲子加入收藏夹失败',res)
          }
        })
       }
       else{
         wx.showToast({
           title: '该曲已收藏',
           icon:'none'
         })
       }
     },
     fail:function(res)
     {
       console.log("查询失败")
     }
   })
  }

  },
  
toyanShi(){
  this.setData({
    yanShi:true
  })
},

toteach(){
this.setData({
  yanShi:false
})
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
         console.log('曲谱图片获取成功',res)
         that.setData({
           quputupian:res.data.qupupic,
           qupuname:res.data.songname,
           qupuvideo:res.data.qupuvideo,
           quputype:res.data.songtype,
           fenmian:res.data.src,
           id:res.data._id
         })
      },
      fail:function(res){
        console.log('曲谱图片获取失败',res)
    }
  })

  db.collection('collect').where({
    qupu_id: qupuId,
  }).get({
    success: function(res) {
      // res.data 是包含以上定义的两条记录的数组
      console.log("收藏中存在该曲子",res.data)
      that.setData({
        collectsign:res.data[0].qupusign
      })
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