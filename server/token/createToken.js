const jwt = require('jsonwebtoken');
const { secret } = require('./config')

module.exports = function (userInfo) {
  // 生成token
  // 第一个参数是载荷，用于编码后存储在 token 中的数据
  // 第二个是密钥，自己定义的，验证的时候也是要相同的密钥才能解码
  // 第三个是 options，可以设置 token 的过期时间
  const token = jwt.sign({
    id: userInfo.id,
    name: userInfo.name,
  }, secret, { expiresIn: '60s' });

  return token;
};
