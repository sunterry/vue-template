const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    'vendor': ['vue/dist/vue.esm.js', 'vue-router/dist/vue-router.esm.js', 'vuex', 'axios/dist/axios.min.js']
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../static/js', '[name].manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, '../')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
