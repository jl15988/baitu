//导入node中的path模块
const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
//使用exports暴露需要的方法
module.exports = {
    //1，entry入口
    entry: './src/index.ts',
    //output输出---因为修改的属性较多，所依使用对象形式更改
    output: {
        filename: 'baitu.js',//默认情况下创建的文件名
        path: path.resolve(__dirname, 'lib')
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

//loader可以处理非js文件资源
    module: {
        rules: [
            // 用ts-loader 处理以ts结尾的文件
            {
                // test 指定的是规则生效的文件
                test: /\.ts$/,    // 表示去【匹配所有以ts结尾的文件
                // t要使用的loader
                use: 'ts-loader',
                // 要排除的文件
                exclude: /node-modules/
            }
        ]
    },

//plugins插件
//补充一些功能插件
    plugins: [
        new CleanWebpackPlugin()
    ],

//mode模式(可以更改默认打包模式)
    mode: 'production'
}
