// pages/collection/collection.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qupu:[],
    deleteid:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let that=this
    /* 第三部分 曲谱获取 */
    db.collection('collect').get({
      success:function(res){
        console.log("收藏曲谱获取成功",res)
          that.setData({
            qupu:res.data
          })
      },
      fail:function(res){
        console.log("收藏曲子获取失败",res)
      },
    })
  },

  xuanze(e){
   let that=this
   console.log(e)
   that.setData({
     deleteid:that.data.deleteid.concat(e.detail.value[0])
   })
/*   if(e.detail.value.length!=0)
  {
    db.collection('collect').doc(e.currentTarget.dataset.id).update({
      data:{
        qupucheck:"ture"
      },success:function(res){
        console.log("更新成功")
      },fail:function(res){
        console.log("更新失败")
      }
    })
  } */

    if(e.detail.value.length !== 0)
   {
     db.collection('collect').doc(e.currentTarget.dataset.id).update({
       data:{
         qupucheck:"true"
       },success:function(res){
         console.log("更新成功")
         that.onLoad()
       },fail:function(res){
        console.log("更新失败")
       }
     })
   }
   else
   {
    db.collection('collect').doc(e.currentTarget.dataset.id).update({
      data:{
        qupucheck:"",
      },success:function(res){
        console.log("成功，未选择")
        that.onLoad()
      },fail:function(res){
       console.log("失败，未选择")
      }
    })
   }
  },

  deletecollect(){
    let that=this
    wx.showModal({
      title: '你确定要移除该曲吗？',
      content: ' ',
      cancelText: '取消',
      confirmText: '确定',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name:'remove',
            success:function(res){
             console.log("云函数调用成功")
             that.onLoad()
            },
            fail:function(res){
              console.log("云函数调用失败")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  

  },










  tolearn(event){
    let song = event.currentTarget.dataset.song;
    wx.navigateTo({
      url: '/pages/present/present?qupuId='+song.qupu_id,
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