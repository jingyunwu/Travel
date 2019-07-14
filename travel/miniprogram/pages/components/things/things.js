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
    id: 0,
    things: [
      {
        url: '../../../img/pack.png',
        thing: '工作',
        bottom: '1px solid #6dbaf9',
        right: '1px solid #eeeeee'
      },
      {
        url: '../../../img/book.png',
        thing: '学习',
        bottom: '1px solid #7dd320',
        right: '1px solid #eeeeee'
      },
      {
        url: '../../../img/think.png',
        thing: '思考',
        bottom: '1px solid #fb9e0b',
        right: ''
      },
      {
        url: '../../../img/write.png',
        thing: '写作',
        bottom: '1px solid #3bd2e6',
        right: '1px solid #eeeeee'
      },
      {
        url: '../../../img/running.png',
        thing: '运动',
        bottom: '1px solid #968af1',
        right: '1px solid #eeeeee'
      },
      {
        url: '../../../img/read.png',
        thing: '阅读',
        bottom: '1px solid #f64659',
        right: ''
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
