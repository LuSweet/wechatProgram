// pages/userb/userb.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   loginOk: true,
   name:'',//用户信息
   userphoto:''
  },

  tologin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
 
  tocollectpage(){
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },

  toliuyan(){
    wx.navigateTo({
      url: '/pages/liuyan/liuyan',
    })
  },

  touserinfor(){
    wx.navigateTo({
      url: '/pages/userinfor/userinfor',
    })
  },

  tomanager(){
     wx.navigateTo({
       url: '/pages/mangerlogin/managerlogin',
     })
  },


  toshare(){
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    let that=this
    let userinfo=wx.getStorageSync('userinfo');
    console.log(userinfo)
    if(userinfo&&userinfo.username){
      db.collection('user_information').doc(userinfo._id).get({
        success:function(res){
          console.log("当前页面用户信息获取成功",res)
          that.setData({
            loginOk: false,
            name:res.data.username,
            userphoto:res.data.userphoto
          })
        },
        fail:function(res)
        {
          console.log("当前页面用户信息获取失败")
        }
      })
      
    }
    else{
      this.setData({
        loginOk: true
      })
    }
   
  },

/* 退出登录 */
quit(){
  wx.setStorageSync('userinfo', null)
  let userinfo=wx.getStorageSync('userinfo');
  console.log(userinfo)
  if(userinfo&&userinfo.username){
    this.setData({
      loginOk: false,
      name:userinfo.username
    })
  }
  else{
    this.setData({
      loginOk: true
    })
  }
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