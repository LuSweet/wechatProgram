// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'cloud1-7gaeksay63023d5a',
})

// 云函数入口函数
exports.main = async (event, context) => {
    return  cloud.database().collection('timeline')
              .doc(event.id)
              .remove()
}