var app = getApp()

const formatTime = date => {
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const hour = date.getHours()
const minute = date.getMinutes()
const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showMsg(msg,icon) {
  wx.showToast({
    title:msg,
    duration:3000,
    icon:icon
  })
}

function request(url,data,header){
  return new Promise((resolv,reject) => {
      wx.showLoading({title:'请稍等...'})
      wx.request({
        url:url,
        data:data,
        method:'POST',
        header: header,
        success:function(res){
          if(!res.data.state){
            showMsg(res.data.message,'none')
          }
          resolv(res.data)
        },
        fail:function(){
          showMsg('网络繁忙','none')
        },
        complete:function(){
          wx.hideLoading()
        }
      })
  })
}

function send(url,data,header,tip){
  return new Promise((resolv,reject) => {
      wx.showLoading({title:'请稍等...'})
      wx.request({
        url:url,
        data:data,
        method:'POST',
        header:header,
        success:function(res){
          if(res.data.state){
            showMsg(tip,'success')
          }else{
            showMsg(res.data.message,'none')
          }
        },fail:function(res){
          showMsg('网络繁忙','none')
        },complete:function(){
          wx.hideLoading()
        }
      })
  })
}

function upload(url,path,header,data,name){
  return new Promise((resolv,reject) =>{
    wx.showLoading({title:'上传中...'})
    wx.uploadFile({
      url: url,
      filePath: path,
      name: name,
      formData: data,
      header:header,
      success(res) {
        if(res.data.state){
          showMsg('完成','success')
        }else{
          showMsg(res.data.message,'none')
        }
        resolv(res)
      },
      fail:function(){
        showMsg('网络繁忙','none')
      },
      complete:function(){
        wx.hideLoading()
      }
    })
  })
}

function preview(url){
  return new Promise((resolv,reject) => {
    wx.showLoading({title:'加载中...'})
    wx.downloadFile({
      url: url,
      success(res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath,
          success(res) {
            console.log('打开文档成功:' + filePath)
          },
          fail:function(){
            wx.previewImage({
              current: filePath,
              urls: [filePath]
            })
          },
          complete:function(){
            wx.hideLoading()
          }
        })
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  showMsg:showMsg,
  request:request,
  send:send,
  upload:upload,
  preview:preview
}