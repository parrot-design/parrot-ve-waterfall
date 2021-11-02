const fs=require('fs');
const path=require('path');
const webpack=require('webpack');
const VueLoaderPlugin=require('vue-loader/lib/plugin');

module.exports={
    mode:'development',
    /**
     * 我们会在examples目录下建多个子目录
     * 我们会把不同章节的demo放到不同的子目录中
     * 每个子目录的下面会创建一个app.ts
     * app.ts作为webpack构建的入口文件
     * entries收集了多目录入口文件并且每个入口还引入了一个用于热更新的文件
     * entries是一个对象key为目录名
     * __dirname 总是指向被执行 js 文件的绝对路径
     * readFileSync表示同步读取文件 在这里表示读取当前目录下的所有文件
     * statSync表示用于异步返回有关给定文件路径的信息 isDirectory 表示是否是目录 existsSync 表示是否存在这个文件
     * 给每个文件添加一个webpack-hot-middleware/client热更新文件
     */
    entry:{
        'base':['webpack-hot-middleware/client',path.join(__dirname,'base/index.js')], 
    },
    // entry:fs.readFileSync(__dirname).reduce((entries,dir)=>{

    //     // const fullDir=path.join(__dirname,dir);
    //     // const entry=path.join(fullDir,'app.ts');
    //     // if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)){
    //     //     entries[dir]=['webpack-hot-middleware/client',entry]
    //     // }
    //     return entries;
    // },{}),
    /**
     * 根据不同的目录名称，打包生成目标js，名称和目录一致
     */
    output:{
        path:path.join(__dirname,'__build__'),
        filename:'[name].js',
        publicPath:'/__build__/'
    },
    module:{
        rules:[
            {
                test: /\.vue$/, 
                loader: 'vue-loader',
                exclude: /node_modules/    
            },
            {
                test:/\.ts$/,
                enforce:'pre',
                use:[
                    {
                        loader:'tslint-loader'
                    }
                ]
            },
            {
                test:/\.tsx?$/,
                use:[
                    {
                        loader:'ts-loader',
                        options:{
                            transpileOnly:true
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            }, 
            {
                test:/\.scss$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'sass-loader'}
                ]
            }
        ]
    },
    resolve:{
        extensions:['.vue','.js']
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new VueLoaderPlugin()
    ]
}