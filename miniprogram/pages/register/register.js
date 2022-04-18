// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    zhanghao:'',
    mima:'',
    userphoto:'cloud://cloud1-7gaeksay63023d5a.636c-cloud1-7gaeksay63023d5a-1305291075/image/tubiao/initphoto.jpg'
    },


  /* 获取用户注册的信息 */
getUserName(event){
  this.setData({
      name:event.detail.value
    })
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
zhuce(){
  let name=this.data.name
  let zhanghao=this.data.zhanghao
  let mima=this.data.mima
  let userphoto=this.data.userphoto
  /* 校验用户名 */
  if(name.length)
   if(name.length<2||name.length>8){
     wx.showToast({
      icon:'none',
       title: '用户名2~8位字符',
     })
     return
   }
   /* 校验手机账号 */
   let zhanghaoReg=/^1(3|4|5|6|7|8|9)\d{9}$/;
   if(!zhanghaoReg.test(zhanghao)){
    wx.showToast({
     icon:'none',
      title: '手机账号不符合要求',
    })
    return
  }

/* 校验密码 */
  if(mima.length<8){
    wx.showToast({
     icon:'none',
      title: '密码至少8位',
    })
    return
  }
 
  wx.cloud.database().collection('user_information').add({
      data:{
         username:name,
         userzhanghao:zhanghao,
         usermima:mima,
         userphoto:userphoto
      },
      success(res)
      {
        wx.showToast({
          title: '注册成功',
        })
        console.log("注册成功",res)
        wx.navigateTo({
          url: '/pages/login/login',
        })
      },
      fail(res){
        console.log("注册成功",res)
      }
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