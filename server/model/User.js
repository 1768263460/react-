const mongoose = require('mongoose');

const User = mongoose.model('user', new mongoose.Schema({
  tel: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}));

// 新增
module.exports.add = async (tel, password)=>{
  const result = await User.findOne({tel});
  if(result){
    throw new Error('该电话号码已存在');
  }else{
    const user = new User({tel, password});
    return await user.save();
  }
}


// 查询
module.exports.findByTel = async (tel)=>{
  // mongodb 方法
  return await User.findOne({tel});
}

module.exports.findByTelAndPsd = async (tel, password)=>{
   // mongodb 方法
  return await User.findOne({tel, password});
}

