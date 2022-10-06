'use strict';
const {
	appId,
	appSecret,
	getToken
} = require("wechant-common")
exports.main = async (event, context) => {
	//event为客户端上传的参数

	const db = uniCloud.database(); //  初始化一个数据库

	const code = event.code
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + appSecret +
		"&js_code=" + code + "&grant_type=authorization_code", {
			dataType: "json"
		}
	)

	const openid = res.data.openid;
	const token = getToken(openid)
	// console.log('openId:', res);
	let dbRes = await db.collection("user").where({
		openid
	}).get() // limit 指定查询结果集上显1  ，证明请求成功
	let userData;
	if (dbRes.affectedDocs <= 0) {
		userData = { // 用户数据
			openid,
			nickName: "微信用户",
			avatarUrl: '/static/images/dafult.png',
			gender: 0, // 0 未知 1 男 2 女
			createTime: Date.now()
		}
		//  使用云数据库
		await db.collection("user").add(userData) // 添加用户数据
	} else {
		userData = dbRes.data[0]
	}

	delete userData['openid']; // 删除 openid 不让客户端看到
	// 不需要把token存在数据库里，只需要登录的时候携带token
	userData['token'] = token
	//返回数据给客户端
	return userData
};
