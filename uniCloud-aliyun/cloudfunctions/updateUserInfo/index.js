'use strict';
const {
	verifyToken
} = require("wechant-common");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		userInfo,
		token
	} = event;

	const db = uniCloud.database()

	const payload = verifyToken(token) // token携带的信息解密出来 得到 openid

	// console.log('userToken', payload);

	const dbRes = await db.collection("user").where({
		openid: payload.openid // 通过openid为索引更新该用户数据
	}).update({
		nickName: userInfo.nickName,
		avatarUrl: userInfo.avatarUrl,
		gender: userInfo.gender,
		country: userInfo.country,
		province: userInfo.province,
		city: userInfo.city
	})

	//返回数据给客户端
	return dbRes.data
};
