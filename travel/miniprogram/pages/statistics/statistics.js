// miniprogram/pages/statistics/statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayNum: 0,  // 今天完成的番茄数
    averageNum: 0, // 平均多少
    weekNum: 0,  // 一个星期的
    kinds: [
      {
        bgColor: '#96bbff',
        kind: '工作'
      },
      {
        bgColor: '#80d128',
        kind: '学习'
      },
      {
        bgColor: '#ffa214',
        kind: '思考'
      },
      {
        bgColor: '#35d6eb',
        kind: '写作'
      },
      {
        bgColor: '#968bee',
        kind: '运动'
      },
      {
        bgColor: '#fb4557',
        kind: '阅读'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ctx = wx.createCanvasContext('statistics');
    // ctx.setGlobalAlpha(1);
    ctx.setLineCap('round');
    ctx.setLineWidth(12);
    ctx.setStrokeStyle('#f0f0f0');
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.draw();

    // console.log(options)
    wx.cloud.callFunction({
      name: 'addToTotal',
      data: {
        
      },
      success:(e) => {
        console.log('success')
        this.setData({

        })
      },
      fail: function(err) {
        console.log(err)
      }
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