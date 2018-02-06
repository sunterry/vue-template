'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlInlineChunkPlugn = require('html-webpack-inline-chunk-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const env = require('../config/prod.env')


const webpackConfig = merge(baseWebpackConfig, {
  module: {
    //  css 文件在 webpack.dev.conf.js 和 wbepack.prod.conf.js 单独配置
    // 是否开启 sourceMap， 是否使用postcss
    rules: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true, usePostCSS: true})
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // prepack-webpack-plugin 由facebook 开源，采用了较为激进得方法，在保持结果一致得情况下，改变源代码得运行逻辑
    // 输出性能更好得javascript代码， 将计算结果提前放到编译后得代码中， 不是在运行时采取求值
    // new PrepackWebpackPlugin(),
    new ParallelUglifyPlugin({
      UglifyJs: {
        cacheDir: true, // 开启缓存
        exclude: /node_modules/, // node_modules下得代码不使用多个子线程压缩
        compress: {
          warnings: false, // 在删除没有用到得代码时不输出警告
          drop_console: true, // 删除代码中所有得console语句
          collapse_vars: true, // 内嵌已定义但只用到一次得变量
          reduce_vars: true // 提取出现了多次但是没有定义成变量去引用得静态值
        },
        output: {
          beautify: false, // 最紧凑得输出
          comments: false //删除所有得注释
        }
      },
      sourceMap: config.build.productionSourceMap, // config/index.js 关闭了sourceMap 调试
      parallel: true,
      cache: true // 开启缓存
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,  // 不管是动态就在的chunk 还是静态加载的都会被提取
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({ // 动态加载的过程中如果重复代码出现2次就会被分隔
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 2
    }),
    // minafest in to html  把 webpack的文件 直接放到html中 防止每次请求
    new HtmlInlineChunkPlugn({
      inlineChunks: ['manifest']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
