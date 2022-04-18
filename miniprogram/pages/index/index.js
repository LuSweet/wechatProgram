// pages/index.js
const db=wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
     banner:[],
      qupu:[],
      search:[],
      searchname:[]
    },

    /* 搜索功能 */
    search:function(e){
        let that = this
        console.log(e)
        let search=e.detail.value
        console.log(search)
        db.collection('qupu').where({
          songname:e.detail.value
        }).get({
          success:function(res){
              that.setData({
                search:res.data
              })
              console.log("搜索成功",that.data.search)
              if(that.data.search==" "){
                wx.showToast({
                  title: '未找到曲子',
                  icon:'none'
                })
              }
              else{
                console.log("成功搜索到该曲子")
                wx.navigateTo({
                  url: '/pages/search/search?search=' + search,
                })
              }
          },
          fail:function(res)
          {
            console.log("搜索失败",res)
          }
        })
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    /* 轮播图获取 */
    db.collection('images').get({
      success:function(res){
        console.log("轮播图获取成功",res)
          that.setData({
            banner:res.data
          })
      },
      fail:function(res){
        console.log("轮播图获取失败",res)
      },
    })

   
   /* 第三部分 曲谱获取 */
    db.collection('qupu').get({
      success:function(res){
        console.log("曲子获取成功",res)
          that.setData({
            qupu:res.data
          })
      },
      fail:function(res){
        console.log("曲子获取失败",res)
      },
    })

  },
totuijian(){
wx.navigateTo({
  url: '/pages/tuijian/tuijian',
})
},
tofenlei(){
  wx.switchTab({
    url: '/pages/learnb/learnb',
  })
},
/* 跳转到该曲子的学习区域 */
tolearn(event){
  let song = event.currentTarget.dataset.song;
  wx.navigateTo({
    url: '/pages/present/present?qupuId='+song._id,
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