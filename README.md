# vue-template

### 安装

***
项目地址: (`git clone`)
```shell
https://github.com/sunterry/vue-template.git
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install || yarn
```
启动服务: (http://localhost:9000)

```
npm run dev || yarn start
```
发布代码

```
npm run build
```
***
目录结构

<pre>
├── build/                      #  项目的 Webpack 配置文件
│   └── ...
├── config/
│   ├── index.js                # 项目配置目录
│   └── ...
├── src/						            # 生产目录
│   └── assets/                 # 一些资源文件
│       └── css                 # css 文件
│       └── image				        # 全局 image文件
│       └── js				          # 全局通用js文件
│   └── components/             # 通用业务组件
│       └── ...
│   └── layout/             		# layout组件
│       └── ...
│   └── directive/              # 全局指令
│       └── ...
│   └── filter/             		# 全局过滤器
│       └── ...
│   └── http/             		  # 请求入口
│       └── index.js				    # 项目接口存放地址
│       └── http.code.js			  # 请求静态常量存放
│       └── request.js			    # axios 封装
│   └── router/             		# 路由配置文件
│       └── ...
│   └── store/             		  # vuex 配置
│       └── ...
│   └── util/             		  # 全局的工具方法
│       └── ...
│   └── views/             		  # 页面组件
│       └── ...
│   └── mian.js/     			      # 页面入口文件
│   └── App.js/     				    # 页面跟组件
├── static/                     # 不需要webpack处理的文件
├── .babelrc                    # babel 配置文件
├── .editorconfig               # 编辑器如何去显示当前代码
├── .eslintrc.js                # eslint 配置文件
├── .eslintignore               # eslint 规则配置
├── .gitignore                  # sensible defaults for gitignore
├── .postcssrc.js               # postcss 配置文件
├── index.html                  # index.html 模板文件
├── package.json                # build scripts and dependencies
└── README.md                   # Default README file
</pre>


当我们第一次使用vue-cli时，开启一个开发环境，并没有帮我们打开一个浏览器页面, 我们修改它：

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

如果我们的端口被占用， 我们怎么修改端口呢

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

打包  npm run build 命令, 可以npm run build --report 来分析我们的代码
