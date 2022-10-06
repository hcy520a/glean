const appId = "wxf350b9bdb8b012e4";
const appSecret = "2dd9cd712df9876a9e3e1017511bc7b4";

const jwt = require('jsonwebtoken') // 在wechant-common 目录 右键使用命令行打开 安装 jsonwebtoken
function getToken(openid) {

	return jwt.sign({
		openid
	}, 'hcy', {
		expiresIn: 60 * 60 * 24
	}) // 60*60*24 一天时效
}

function verifyToken(token) { // token解密
	return jwt.verify(token, 'hcy')
}

module.exports = {
	// 公用模块用法请参考 https://uniapp.dcloud.io/uniCloud/cf-common
	appId,
	appSecret,
	getToken,
	verifyToken
}
