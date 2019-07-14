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
    text: '计时中'
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
        text: '计时中'
      });
      this.CountInterval();
    }
  },
  ifCount: function() {
    if (this.data.count === 60) {
      this.setData({
        text: '已完成',
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
        count: 0
      }) 
    }
  },
  drawCircleBg: function() {
    var ctx = wx.createCanvasContext('circleBg');
    ctx.setLineWidth(3);
    ctx.setStrokeStyle('#eef9ff');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(115, 115, 100, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.draw();
  },
  drawCircleProgress: function(step) {
    var ctx = wx.createCanvasContext('circleProgress');
    ctx.setLineWidth(5);
    ctx.setStrokeStyle('aqua');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(115, 115, 100, -Math.PI/2, step*Math.PI-Math.PI/2, false);
    ctx.stroke();
    ctx.draw();
  },
  CountInterval: function() {
    this.setTimer = setInterval(()=>{
      if(this.data.count <= 60 && !this.data.stoptime) {
        this.drawCircleProgress(this.data.count/(60/2));
        this.data.count++;
        this.ifCount();
      }else {
        clearInterval(this.setTimer);
      }   
    },100);
    
  },
  onLoad: function() {
    
  },
  onShow: function() {
    
  },
  onReady: function() {
    
    // this.drawCircleProgress(1);
    
  }

   
    

})
