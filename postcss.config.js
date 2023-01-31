module.exports = {
  plugins: {
    //   'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    'postcss-pxtorem': {
      // 转换的根元素基准值
      // 正常情况下按照设计稿来设置，750宽（逻辑像素）的设计稿，750/10=75；375宽（逻辑像素）的设计稿，375/10=37.5
      // vant组件库是基于375的逻辑像素设计的

      rootValue: 37.5,
      propList: ['*']
    }
  }
}
