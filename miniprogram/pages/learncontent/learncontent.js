// pages/learncontent/learncontent.js

const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qupu:[],
    kechenname:''
  },
                                                                                                                                                                                           
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let kechenname=options.kechen
    this.setData({
      kechenname:kechenname
    })
    console.log(kechenname)
    let that=this
    /* 第三部分 曲谱获取 */
    db.collection('qupu').where({
      songtype:kechenname
    }).get({
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