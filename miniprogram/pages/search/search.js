// pages/search/search.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   search:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log(options.search)
    let songname=options.search
    db.collection('qupu').where({
      songname:songname
    }).get({
      success:function(res){
          that.setData({
            search:res.data
          })
          console.log("搜索成功",that.data.search)
        },
    })
  },


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