# vue-app

```
  static  存放一些不需要被webpack所处理的一些文件，比如第三方并没有被node_modules所管理的包
  src     项目的源码文件
  config  开发环境以及生产环境的区分
  build   生产环境和开发环境的一些配置
```

### 运行
```
  yarn 下载依赖
  yarn start 开发环境自动打开浏览器

```
### 当我们第一次使用vue-cli时，开启一个开发环境，并没有帮我们打开一个浏览器页面, 我们修改它：
 ```
     build/webpack.dev.conf.js
             devServer: {
               ....
               open: config.dev.autoOpenBrowser
             }
             -->  /config
                       dev: {
                         autoOpenBrowser: true
                       }

 ```

### 如果我们的端口被占用， 我们怎么修改端口呢
```
    build/webpack.dev.conf.js
       devServer: {
         ....
         host: HOST || config.dev.host,
         // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
         // 你可以被环境变量所更改，如果端口被占用了，他就会重新的指定一个新的端口
       }
       --> /config
        dev: {
          port:2000
        }
    || cmd/git Bash
        PORT=4000 npm run dev

```
### 打包  npm run build 命令, 可以npm run build --report 来分析我们的代码


### 开发配置
      build/webpack.base.conf.js 文件， 大概有4块内容
        1. 所需依赖
        2. resolve () 函数， 只要调用了这个方法， 那么所有的文件路径都是从项目的根路径出发的
        3. eslint-loader的配置
        4. 整体的基础的配置

      .babelrc babel的配置文件
      .editorconfig 告诉各个编辑器如何去显示当前代码
