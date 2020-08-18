### 配置antd
1. npm install antd --save
2. npm install babel-plugin-import --save-dev  在 npm 发布包内的 antd/dist 目录下提供了 antd.js antd.css 以及 antd.min.js antd.min.css，这里通过 “babel-plugin-import”来引用扩展文件，修改babel配置如下：
``` JS
    {
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
        [
        "import",
        {
            "libraryName": "antd",
            "style": "css"// 不能设置为true，不然antd引入报错
        }
        ]
    ],
    "sourceMaps": true
    }
```