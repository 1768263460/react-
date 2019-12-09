const config = {
  appid: 1400281346,
  appkey: 'b0d5c104bebbfaedc09e62a2e1fd4622',
  templateId: '463142',
  smsSign: '烙如花形'
}


const createCode = (tel)=>{
  // 生成验证码
  let result = Math.floor(Math.random() * 1000000).toString();
  while(result.length < 6){
    // 当验证码的长度小于6时，补0
    result = '0'+result;
  }
  return result;
}


// 向外 输出 发送验证码的 函数
module.exports = (tel)=>{
  return new Promise((resolve, reject)=>{
    var QcloudSms = require("qcloudsms_js");
    var code = createCode(tel);
    var params = [code, 2];
    // 实例化 QcloudSms
    var qcloudsms = QcloudSms(config.appid, config.appkey);
    var ssender = qcloudsms.SmsSingleSender();
    ssender.sendWithParam("86", tel, config.templateId,
    params, config.smsSign, "", "", (err, res, resData)=>{
      if (err) {
          reject('发送验证码失败');
      } else {
          console.log("response data: ", resData);
          if(resData.result == 0){
            resolve(code);
          }else{
            reject(resData.errmsg);
          }
      }
    });

  })
}