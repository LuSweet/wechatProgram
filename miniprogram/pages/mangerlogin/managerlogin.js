// pages/mangerlogin/managerlogin.js
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

    tomanager(){
      let zhanghao=this.data.zhanghao
      let mima=this.data.mima
      console.log(zhanghao,mima)
      /* 检查账号 */
      let zhanghaoReg=/^(manager1)(3|4|5|6|7|8|9)\d{9}$/;
      if(zhanghao.length<10)
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
          title: '管理员账号错误',
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
      wx.cloud.database().collection('manager').where({
        managerzhanghao:zhanghao
      }).get({
        success(res){
           console.log('数据获取成功',res)
           let manager=res.data[0]
           if(mima==manager.managermima){
             console.log('登陆成功')
             wx.showToast({
               title: '成功登陆',
             })

             wx.reLaunch({
               url: '/pages/manager/manager',
             })
              /* 本地存储管理员信息 */
            /*   wx.setStorageSync('userinfo', user) */
             
           }

           else{
             console.log('登陆失败')
             wx.showToast({
               icon:'none',
               title: '你没有管理员权限',
             })
             return
           } 
        },
        fail(res){
           console.log('数据获取失败',res)
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