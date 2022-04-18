// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhanghao:'',
    mima:''
  },


getZhangHao(event){
this.setData({
   zhanghao:event.detail.value
})
},

getMiMa(event){
this.setData({
  mima:event.detail.value
})
},

login(){
  let zhanghao=this.data.zhanghao
  let mima=this.data.mima
  console.log(zhanghao,mima)
  /* 检查账号 */
  let zhanghaoReg=/^1(3|4|5|6|7|8|9)\d{9}$/;
  if(zhanghao.length<1)
  {
     wx.showToast({
       icon:'none',
       title: '账号为空',
     })
     return
  }
  
  if(!zhanghaoReg.test(zhanghao))
  {
    wx.showToast({
      icon: 'none',
      title: '账号错误',
    })
    return
  }
  
/* 检查密码 */
  if(mima.length<8)
  {
    wx.showToast({
      icon: 'none',
      title: '密码错误',
    })
    return
  }

  /* 检查账号密码 */
  wx.cloud.database().collection('user_information').where({
    userzhanghao:zhanghao
  }).get({
    success(res){
       console.log('数据获取成功',res)
       let user=res.data[0]
       if(mima==user.usermima){
         console.log('登陆成功')
         wx.showToast({
           title: '成功登陆',
         })
          /* 本地存储用户信息 */
          wx.setStorageSync('userinfo', user)
         wx.switchTab({
           url: '/pages/userb/userb',
         })
        
       }
       else{
         console.log('登陆失败')
         wx.showToast({
           icon:'error',
           title: '账号或密码错误',
         })
         return
       } 
    },
    fail(res){
       console.log('数据获取失败',res)
    }
  })  

},


startzhuce(){
  wx.navigateTo({
    url: '/pages/register/register',
  })
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