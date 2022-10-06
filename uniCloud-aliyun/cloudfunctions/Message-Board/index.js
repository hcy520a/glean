'use strict';
const {
    verifyToken
} = require("wechant-common");
let db = uniCloud.database({
    throwOnNotFound: false
})
exports.main = async (event, context) => {
    //event为客户端上传的参数
    const {
        userInfo,
        content,
        api
    } = event;

    if (api === 'publish') {
        const payload = verifyToken(userInfo.token) // token携带的信息解密出来 得到 openid
        return await db.collection("message").add({
            openid: payload.openid,
            content,
            createTime: Date.now(),
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl
        })
    }

    if (api === 'getMessage') { // 获取发布的留言内容
        return await db.collection("message").orderBy('createTime', 'desc').get()
    }
    if (api === 'show') {
        return await db.collection("logs").get()
    }
    //返回数据给客户端
    return event
};
