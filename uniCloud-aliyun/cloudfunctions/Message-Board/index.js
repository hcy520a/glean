'use strict';
let db = uniCloud.database({
    throwOnNotFound: false
})
exports.main = async (event, context) => {
    //event为客户端上传的参数
    if (event.api === 'publish') {
        return await db.collection("message").add({
            content: event.content,
            createTime: Date.now(),
            nickName: event.nickName,
            avatarUrl: event.avatarUrl
        })
    }

    if (event.api === 'getMessage') { // 获取发布的留言内容
        return await db.collection("message").get()
    }

    //返回数据给客户端
    return event
};
