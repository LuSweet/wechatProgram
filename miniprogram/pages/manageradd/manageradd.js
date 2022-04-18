// pages/manageradd/manageradd.js
const db = wx.cloud.database()
let VideoUrlExchange=""
/* let app = getApp(); */
Page({

  data: {
    qupupic:[],
    fileIDs:[],
    fenmian:"",
    quming:' ',
    type:' ',
    VideoUrl:"",
    VideoUrltwo:""
  },

getquming(event){
  this.setData({
   quming:event.detail.value
  })
},
gettype(event){
  this.setData({
    type:event.detail.value
  })
},

Choosefenmian(){
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: chooseResult => {
      // 将图片上传至云存储空间
      console.log('选择成功')
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: 'qupu/' + new Date().getTime() + '.png',
        // 指定要上传的文件的小程序临时文件路径
        filePath: chooseResult.tempFilePaths[0],
        // 成功回调
        success: res => {
          console.log('上传成功', res.fileID)
          this.setData({
            fenmian:res.fileID
          })
        },
        fail:res => {
          console.log('失败')
        }
      })
    },

  })
},

Deletefenmian(e) {
  let that=this
  wx.showModal({
    title: '要删除这张封面吗？',
    content: '',
    cancelText: '取消',
    confirmText: '确定',
    success: res => {
      if (res.confirm) {
        that.setData({
          fenmian:''
        })
        wx.cloud.deleteFile({
          fileList:[e.currentTarget.dataset.src],
          success: res => {
           console.log(res.fileList)
          },
          fail: err => {
          }
        })
      }
    }
  })
  console.log(this.data.fenmian)
},



//删除封面
/* Deletefenmian(e) {
  wx.showModal({
    title: '要删除这张照片吗？',
    content: '',
    cancelText: '取消',
    confirmText: '确定',
    success: res => {
      if (res.confirm) {
    this.data.fenmian.splice(e.currentTarget.dataset.id, 1); 
        this.setData({
          fenmian: " "
        })
        wx.cloud.deleteFile({
          fileList:[e.currentTarget.dataset.src],
          success: res => {
           console.log('云存储删除成功')
          },
          fail: err => {
           console.log('云储存删除失败')
          }
        })
      }
    }
  })
  console.log(this.data.fenmian)
},
 */






 ChooseImage2(){
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: chooseResult => {
      // 将图片上传至云存储空间
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: 'qupu/' + new Date().getTime() + '.png',
        // 指定要上传的文件的小程序临时文件路径
        filePath: chooseResult.tempFilePaths[0],
        // 成功回调
        success: res => {
          console.log('上传成功', res.fileID)
          this.setData({
            qupupic:this.data.qupupic.concat(res.fileID)
          })
        },
        fail: res => {
          //handle error
        }
      })
    },

  })
},

//删除图片
DeleteImg2(e) {
  wx.showModal({
    title: '要删除这张照片吗？',
    content: '',
    cancelText: '取消',
    confirmText: '确定',
    success: res => {
      if (res.confirm) {
        this.data.qupupic.splice(e.currentTarget.dataset.id, 1);
        this.setData({
          qupupic: this.data.qupupic
        })
        wx.cloud.deleteFile({
          fileList:[e.currentTarget.dataset.src],
          success: res => {
           //handle success
           console.log(res.fileList)
          },
          fail: err => {
           
          }
        })
      }
    }
  })
  console.log(this.data.qupupic)
},


  /* 演示视频上传 */
  uploadVideo(){
    wx.chooseVideo({
      success: chooseResult => {
        // 将视频上传至云存储空间
        console.log("视频选择完成",chooseResult)
        console.log("上传中······")
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'qupu/' + new Date().getTime() + '.MP4',
          // 指定要上传的文件的小程序临时文件路径，也即刚刚选中的视频，所在开发工具中的临时位置
          filePath: chooseResult.tempFilePath,
          // 成功回调
          success: res => {
            console.log('上传成功，路径为：', res.fileID)
            VideoUrlExchange = res.fileID
            console.log(VideoUrlExchange)
            //2. 初始化视频数据
            this.setData({
              VideoUrl: VideoUrlExchange
            }) 
            }
        })
      }
    })
  },

  /* 教学视频上传 */
  uploadVideotwo(){
    wx.chooseVideo({
      success: chooseResult => {
        // 将视频上传至云存储空间
        console.log("视频选择完成",chooseResult)
        console.log("上传中······")
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'qupu/' + new Date().getTime() + '.MP4',
          // 指定要上传的文件的小程序临时文件路径，也即刚刚选中的视频，所在开发工具中的临时位置
          filePath: chooseResult.tempFilePath,
          // 成功回调
          success: res => {
            console.log('上传成功，路径为：', res.fileID)
            VideoUrlExchange = res.fileID
            console.log(VideoUrlExchange)
            //2. 初始化视频数据
            this.setData({
              VideoUrltwo: VideoUrlExchange
            }) 
            }
        })
      }
    })
  },




publish(){
  let quming = this.data.quming
  let type = this.data.type
  let fenmian=this.data.fenmian
  let video1=this.data.VideoUrl
  let video2=this.data.VideoUrltwo
  let  qupupic= this.data.qupupic
  /* 判断是否满足条件*/
  if (!qupupic || qupupic.length < 1) {
    wx.showToast({
      icon: "none",
      title: '请选择图片'
    })
    return
  }
  /* 弹出提醒 */
  wx.showModal({
    title: '你确定要发布吗？',
    content: '',
    cancelText: '取消',
    confirmText: '确定',
    success (res) {
      if (res.confirm) {
        console.log('管理员点击确定')
        db.collection('qupu').add({
          data:{
            songname:quming,
            songtype:type,
            src:fenmian,
            qupupic:qupupic,
            qupuvideo:{video1,video2}
          },
          success: res => {
            wx.showToast({
              title: '数据库上传成功',
              duration: 1500
            })
            // 在页面内 navigateBack，将返回管理总页面
            wx.redirectTo({
              url: '/pages/manager/manager',
            })
          },
          fail: res => {
            console.log("数据库上传失败")
          }
        })
      }
       else if (res.cancel) {
        console.log('管理员点击取消')
      }
    }
  })

},






  //上传数据
  publish2() {
    let quming = this.data.quming
    let type = this.data.type
    let video = this.data.video
    let imgList = this.data.imgList
    if (!imgList || imgList.length < 1) {
      wx.showToast({
        icon: "none",
        title: '请选择图片'
      })
      return
    }
    wx.showLoading({
      title: '发布中...',
    })

    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.imgList.length; i++) {
      let filePath = this.data.imgList[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log("上传结果", res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log("上传失败", error)
        })
      }))
    }
    //保证所有图片都上传成功
    let db = wx.cloud.database()
    Promise.all(promiseArr).then(res => {
      db.collection('qupu').add({
        data: {
          fileIDs: this.data.fileIDs,
          date: app.getNowFormatDate(),
          createTime: db.serverDate(),
          images: this.data.imgList,
          songname:quming,
          songtype:type,
          qupuvideo:video
        },
        success: res => {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
          })
          console.log('发布成功', res)
          wx.navigateTo({
            url: '../manager/manager',
          })
        },
        fail: err => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '网络不给力....'
          })
          console.error('发布失败', err)
        }
      })
    })
  }

  



  


})