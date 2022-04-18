// pages/manag_user/manag_user.js
 const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user:[]
  },

tocontent(event){
    console.log(event)
    let  user= event.currentTarget.dataset.song;
    wx.navigateTo({
      url: '/pages/manag_userdes/manag_userdes?userid='+user._id,
    })
  }, 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this
      db.collection('user_information').get({
        success:function(res){
           that.setData({
             user:res.data
           })
        }
        })
  },
  
/*   tomanaguserdes(event){
    console.log(event)
    let user = event.currentTarget.dataset.song;
    wx.navigateTo({
      url: '/pages/manag_userdes/manag-userdes?userid='+user._id,
    })
  },  */

 


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