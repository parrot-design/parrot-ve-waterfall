const express=require('express');
const bodyParser=require('body-parser');
const webpackConfig=require('./webpack.config');
const webpack=require('webpack');
const webpackDevMiddleware=require('webpack-dev-middleware');
const webpackHotMiddleware=require('webpack-hot-middleware'); 
const app=express();
const compiler=webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler,{
    publicPath:'/__build__/',
    stats:{
        colors:true,
        chunks:false
    }
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));
  

const port=process.env.PORT||15000;

module.exports=app.listen(port,()=>{
    console.log(`Starting on http://localhost:${port}`)
})
 