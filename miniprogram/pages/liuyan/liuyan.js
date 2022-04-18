// pages/liuyan/liuyan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },
  // 预览图片
  previewImg: function(e) {
    let imgData = e.currentTarget.dataset.img;
    console.log("eeee", imgData[0])
    console.log("图片s", imgData[1])
    wx.previewImage({
      //当前显示图片
      current: imgData[0],
      //所有图片
      urls: imgData[1]
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
    let that = this;
    let userinfo=wx.getStorageSync('userinfo');
    let id=userinfo._id
    console.log(id)
    if(!userinfo)
    {
      wx.showToast({
        title: '你还未登录！',
        icon:'error'
      })
    }
    else
    {
      wx.cloud.database().collection('timeline').where({
          'userinfo._id':id
      }).orderBy('createTime', 'desc') //按发布视频排序
      .get({
        success(res) {
          console.log("用户留言数据请求成功", res)
          that.setData({
            dataList: res.data
          })
        },
        fail(res) {
          console.log("用户留言数据请求失败", res)
        }
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