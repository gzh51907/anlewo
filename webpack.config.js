const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/bundle-[name]-[hash:6].js'
    },
    devServer: {
        contentBase: path.join(__dirname, './src')
    },
    resolve: {
        alias: {
            // 'vue$':'vue/dist/vue.js', //解决Vue单文件组件不能使用template的问题
            '@': path.resolve('src'),
            '!': path.resolve('src/components'),
            '~': path.resolve('src/pages'),
        },
        extensions: ['.js', '.jsx']
    },
    //加载器
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: [
                        ["@babel/plugin-proposal-decorators", { legacy: true }],
                        ["babel-plugin-import", {
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "css"
                        }],
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            },
            include: path.resolve(__dirname, './src')
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    //插件
    plugins: [
        //清空dist文件夹
        new CleanWebpackPlugin(),
        //创建dist目录下的文件
        new HtmlWebpackPlugin({
            //模版
            template: './src/template.html'
        })
    ]

};