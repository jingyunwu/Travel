//index.js
const app = getApp()

Page({
  data: {
    ff: 1,
    stopVoice: false,
    stoptime: false,
    dec1: '暂停计时',
    dec2: '继续计时'
  },
  start: function() {
    this.setData({
      ff: 2
    })
  },
  handleVoice: function() {
    if (this.data.stopVoice) {
      this.setData({
        stopVoice: false
      })
    } else{
      this.setData({
        stopVoice: true
      })
    }
    
  },
  stopTime: function() {
    if (this.data.stoptime) {
      this.setData({
        stoptime: false
      })
    } else {
      this.setData({
        stoptime: true
      })
    }
  },
  giveUp: function() {
    this.setData({
      ff: 1
    })
  },
  onLoad: function() {
    
  }

    // 获取用户信息
    

})
