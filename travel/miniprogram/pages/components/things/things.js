// pages/components/things/things.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    cc: '#353535',
    jj: '#aeaeae',
    things: [
      {
        url: '../../../img/pack.png',
        thing: '工作',
        color: '#6dbaf9'
      },
      {
        url: '../../../img/book.png',
        thing: '学习',
        color: '#7dd320'
      },
      {
        url: '../../../img/think.png',
        thing: '思考',
        color: '#fb9e0b'
      },
      {
        url: '../../../img/write.png',
        thing: '写作',
        color: '#3bd2e6'
      },
      {
        url: '../../../img/running.png',
        thing: '运动',
        color: '#968af1'
      },
      {
        url: '../../../img/read.png',
        thing: '阅读',
        color: '#f64659'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select(e) {
      // console.log(e);
      let that = this;
      let id = e.currentTarget.dataset.id
      that.setData({
        id
      }) 
    }
  }
})
