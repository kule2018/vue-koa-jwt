const jwt = require('jsonwebtoken');
const { secret } = require('./config')

// 检查token是否过期
module.exports = (token) => {
	if (token) {
		// 传过来的原始 token 有 Bearer 前缀
		token = token.split(' ')[1]
		let decoded
		try {
			decoded = jwt.verify(token, secret)
		} catch (err) {
			return false
		}
		return decoded
	} else {
		return false;
	}
}