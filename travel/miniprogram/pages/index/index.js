//index.js
const app = getApp()

Page({
  data: {
    firstPage: true,  // 开始时候显示
    stopVoice: false,  // 静音
    stoptime: false, // 停止计时
    start: false,  // 开始
    dec1: '暂停计时',  
    dec2: '继续计时',
    count: 0,  // 计时
    setTimer: null,  //定时器
    text: '计时中',
    n: 1500,  // 总时间
    num: 0,
    opacity: 1,
    logged: false,
    category: null  // 哪个类型
  },
  GetValue: function(e) {  // 从子组件获取到 category
    // console.log(e);
    if(this.data.count === 1500) {
      this.setData({
        category: e.detail.category
      })  
    }
    
  },
  start: function() {  // 开始
    setTimeout(this.drawCircleBg, 30);
    this.audioCtx.play()
    if(!this.data.start && this.data.count === 0 && !this.data.stoptime) {
      this.setData({
        firstPage: false,
        start: true,
      })
      this.CountInterval(); 
    } else {
      this.setData({
        firstPage: false,
        start: true,
        count: 0,
        stoptime: false,
        text: '计时中',
      });
      this.CountInterval();
    }
  },
  ifCount: function() {  // 完成时的状态
    if (this.data.count === 1500) {
      this.setData({
        text: '已完成',
        start: false,
        opacity: 0
      })
    }
  },
  handleVoice: function() { //
    if (this.data.stopVoice) {
      this.audioCtx.play()
      this.setData({
        stopVoice: false
      })
    } else{
      this.audioCtx.pause()
      this.setData({
        stopVoice: true
      })
    }
    
  },
  stopTime: function() {
    if (this.data.stoptime) {
      this.audioCtx.play()
      this.setData({
        stoptime: false,
        text: '计时中'
      })
      this.CountInterval();
      // this.countTime(); 
    } else {
      this.audioCtx.pause()
      this.setData({
        stoptime: true,
        text: '已暂停'
      })
    }
  },
  giveUp: function() {
    this.audioCtx.pause()
    if(this.data.start) {
      this.setData({
        firstPage: true,
        start: false,
        stoptime: false,
        text: '计时中',
        count: 0,
        n: 1500,
        num: 0
      }) 
    }
  },
  newStart: function() {  // 新的开始
    this.audioCtx.play()
    if(!this.data.start) {
      this.setData({
        firstPage: true,
        stoptime: false,
        text: '计时中',
        count: 0,
        opacity: 1,
        n: 1500,
        num: 0
      })
    }
  },
  drawCircleBg: function() {  // 画圆
    var ctx = wx.createCanvasContext('circleBg');
    ctx.setLineWidth(3);
    ctx.setStrokeStyle('#eef9ff');
    ctx.setLineCap('round');
    ctx.setGlobalAlpha(0.2);
    ctx.beginPath();
    ctx.arc(105, 105, 90, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.draw();
  },
  drawCircleProgress: function(step) {  // 画动态的圆
    var ctx = wx.createCanvasContext('circleProgress');
    ctx.setLineWidth(5);
    ctx.setStrokeStyle('aqua');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(105, 105, 90, -Math.PI/2, step*Math.PI-Math.PI/2, false);
    ctx.stroke();
    ctx.draw();
    var minute = parseInt((this.data.n - this.data.num) / 60)
    if (minute < 10) {
      minute = "0" + minute
    }
    var seconds = (this.data.n - this.data.num) % 60
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    // 绘制倒计时文本

    ctx.setLineWidth(1)
    ctx.setFontSize(40)
    ctx.setFillStyle('#ffffff')
    ctx.setTextAlign('center')
    ctx.setTextBaseline('middle')
    ctx.setGlobalAlpha(this.data.opacity)
    ctx.fillText(minute + ":" + seconds, 105, 105, 100)
    ctx.fill()
    

    ctx.draw(true)

    // 每完成一次全程绘制就+1
    this.data.num++;
  },
  CountInterval: function() {
    this.setTimer = setInterval(()=>{
      if(this.data.count <= 1500 && !this.data.stoptime) {
        this.drawCircleProgress(this.data.count/(1500/2));
        this.data.count++;
        this.ifCount();
      }else {
        clearInterval(this.setTimer);
      }   
    },1000);
    
  },
  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    }),
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  onShow: function() {
    
  },
  

})


