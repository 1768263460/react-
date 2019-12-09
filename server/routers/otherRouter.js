const express = require('express');
const router = new express.Router();
const http = require("http");
const https = require("https");


router.get('/Tuling/Ask', (req, res)=>{
    http.request({
        host: "api.avatardata.cn", // 远端服务器域名
        path: req.url
    },(response=>{
        response.on('data',(data)=>{
            res.write(data);
        })
        response.on("end",()=>{
            res.end();
        })
    } )).end()
 }
)


router.get('/cgi-proxy/search/associate_label', (req, res)=>{
    https.request({
        hostname: "m.ke.qq.com", // 远端服务器域名
        path: req.url
    },(response=>{
        response.on('data',(data)=>{
            res.write(data);
        })
        response.on("end",()=>{
            res.end();
        })
    })).end()
 }
)


router.get('/goodbook/query', (req, res)=>{
    http.request({
        host: "apis.juhe.cn", // 远端服务器域名
        path: req.url
    },(response=>{
        response.on('data',(data)=>{
            res.write(data);
        })
        response.on("end",()=>{
            res.end();
        })
    })).end()
 }
)

router.get('/jztk/query', (req, res)=>{
    http.request({
        host: "v.juhe.cn", // 远端服务器域名
        path: req.url
    },(response=>{
        response.on('data',(data)=>{
            res.write(data);
        })
        response.on("end",()=>{
            res.end();
        })
    })).end()
 }
)

module.exports  = router;