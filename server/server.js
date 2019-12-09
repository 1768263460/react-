const express = require('express');
const mongoose = require('mongoose');

const server = express();

//设置跨域请求
server.all('*',function(req,res,next){
  //设置请求头,允许所有来源访问
  res.header('Access-Control-Allow-Origin', '*');

  //允许访问的方式
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

  next();
})

server.use(express.urlencoded({urlencoded: false}));
server.use(express.json());

server.use('/api/user', require('./routers/userRouter'));


// 自定义的接口
server.use('/others', require('./routers/otherRouter'));


// 响应静态资源
server.use("/css",express.static("./www/css"));
server.use("/js",express.static("./www/js"));
server.use("/mui",express.static("./www/mui"));
server.use("/static/css",express.static("./www/static/css"));
server.use("/img",express.static("./www/img"));
server.use("/static/js",express.static("./www/static/js"));

// 单页面响应首页
server.use((req,res,next)=>{
  res.sendFile(__dirname+"/www/index.html")
});


// 连接数据库
mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true,useUnifiedTopology: true }, (error)=>{
  if(error){
    console.log('连接数据库失败：');
    console.log(error);
  }else{
    console.log('连接数据成功');
    // 启动成功
    server.listen('9000', (error)=>{
      if(!error){
        console.log('服务器启动成功: http:localhost:9000');
      }else{
        console.log('服务器启动失败：');
        console.log(error);
      }
    })
  }
})



