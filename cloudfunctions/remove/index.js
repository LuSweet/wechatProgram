// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'cloud1-7gaeksay63023d5a',
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('collect').where({
      qupucheck: "true"
    }).remove()
  } catch(e) {
    console.error(e)
  }
}