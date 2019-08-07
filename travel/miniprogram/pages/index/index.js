//index.js
const app = getApp()

Page({
  data: {
    ff: true,
    stopVoice: false,
    stoptime: false,
    start: false,
    dec1: '暂停计时',
    dec2: '继续计时',
    count: 0,
    setTimer: null,
    text: '计时中',
    setTimer1: null,
    n: 1500,
    num: 0,
    opacity: 1
  },
  GetValue: function(e) {
    // console.log(e);
    e.detail.category
  },
  start: function() {
    setTimeout(this.drawCircleBg, 30);
    if(!this.data.start && this.data.count === 0 && !this.data.stoptime) {
      this.setData({
        ff: false,
        start: true,
      })
      this.CountInterval(); 
    } else {
      this.setData({
        ff: false,
        start: true,
        count: 0,
        stoptime: false,
        text: '计时中',
      });
      this.CountInterval();
    }
  },
  ifCount: function() {
    if (this.data.count === 1500) {
      this.setData({
        text: '已完成',
        start: false,
        opacity: 0
      })
    }
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
        stoptime: false,
        text: '计时中'
      })
      this.CountInterval();
      // this.countTime(); 
    } else {
      this.setData({
        stoptime: true,
        text: '已暂停'
      })
    }
  },
  giveUp: function() {
    if(this.data.start) {
      this.setData({
        ff: true,
        start: false,
        stoptime: false,
        text: '计时中',
        count: 0,
        n: 1500,
        num: 0
      }) 
    }
  },
  newStart: function() {
    if(!this.data.start) {
      this.setData({
        ff: true,
        stoptime: false,
        text: '计时中',
        count: 0,
        opacity: 1,
        n: 1500,
        num: 0
      })
    }
  },
  drawCircleBg: function() {
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
  drawCircleProgress: function(step) {
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
    
  },
  onShow: function() {
    
  },

})
