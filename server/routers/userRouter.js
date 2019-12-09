const express = require('express');
const User = require('../model/User');
const router = new express.Router();


// 发送验证码
router.get('/send_code', (req, res)=>{
  // 需要发送短信的手机号码
  const { tel } = req.query;
  if(tel){
    // 发送验证码
    const sendCode = require('../utils/sendCode');
    // 发送验证码成功，执行 then
    sendCode(tel).then((code)=>{
      res.json({
        message: '发送验证码成功',
        code: 0,
        data: {
          code
        }
      });
    }).catch((err)=>{
      res.json({
        message: err,
        code: -1
      })
    })

  }
  else{
    res.json({
      message: '需要电话号码发送验证码',
      code: -1
    })
  }
})


// 注册
router.post('/regiester', (req,res)=>{
  const {tel, password} = req.body;
  User.add(tel, password)
  .then((userInfo)=>{
    res.json({
      code: 0,
      message: 'ok'
    })
  })
  .catch((error)=>{
    res.json({
      code: -1,
      message: error.message
    })
  })
});

// 登录
router.post('/login', (req, res)=>{
  const {tel, type, value} = req.body;
  if(type === 'code'){
    //验证码登录
    User.findByTel(tel)
    .then(result=>{
      if(result){
        res.json({
          code: 0,
          message: '登录成功'
        });
      }else{
        res.json({code: -1, message: '该账号不存在'});
      }
    })
    .catch(error=>{
      res.json({code: -2, message: error.message});
    })
  }else if(type === 'password'){
    //密码登录
    User.findByTelAndPsd(tel, value)
    .then(result=>{
      if(result){
        res.json({
          code: 0,
          message: '登录成功'
        });
      }else{
        res.json({code: -1, message: '该账号或密码不正确'});
      }
    })
    .catch(error=>{
      res.json({code: -2, message: error.message});
    })
  }
});




module.exports = router;