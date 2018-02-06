'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

// 只要通过这个resolve函数，就会把所有的目录先指向根目录，然后在找到相对应的路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// assetsPath 会根据我们的环境变量，如果是生产环境，他就会根据 /config build 下指定的目录
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  // 这个方法是node给跨平台使用的，不管是mac 还是windows下都保持一致
  return path.posix.join(assetsSubDirectory, _path)
}

// rules下面并没有 css loader的配置
exports.cssLoaders = function (options) {
  options = options || {}

  // 定义css-loader
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // 定义postcss-loader
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // 声明的两个常量的loader, 将在 generatreLoaders去处理
  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    // options来自webpack.dev.conf.js 或者 webpack.prod.conf.js 的穿参， 来确定需要不需要使用postcss
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    // 如果发现了 less、scss 的时候 就会忘这个loaders 添加 loader 并且给到 sourceMap
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // 处理提取css  如果提取， 就使用 vue-style-loader 来提取
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders, // loaders 还是 上面的loader
        fallback: 'vue-style-loader'  // 如果不使用ExtractTextPlugin.extract 那么就直接使用 vue-style-loader
      })
    } else {
      // 如果不提取就直接使用 [vue-style-loader, style-loader ...]
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
//  css 文件在 webpack.dev.conf.js 和 wbepack.prod.conf.js 单独配置
exports.styleLoaders = function (options) {
  const output = []
  // 传进来的这些参数，先由cssloader去处理， 拿到结果然后进行for循环 ，再去判断， 拼成一个数组 最后return出去
  const loaders = exports.cssLoaders(options)

  // extension 是处理文件的后缀名
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'), // 加入正则去判断， 有一个自动生成的过程
      use: loader,
      exclude: resolve('node_modules'),
      include: resolve('src')
    })
  }
  // 输入是 options， 输出是 output 是数组[]， 在merge的时候 就会生成一个完整的loader 给webpakc去处理
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
