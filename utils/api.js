// 封装uni.showToast()函数
export const showToast = (msg, type) => {
    uni.showToast({
        title: msg,
        icon: type
    })
}
//  封装存储 本地 和 全局
export const setGlobalCache = (cache, cacheKey) => {
    getApp().globalData.userInfo = cache
    uni.setStorageSync(cacheKey, cache)
}
// 封装uni.showModal()函数   不会
export const showModal = (title, content, confirmText, cancelText, ) => {
    uni.showModal({
        title,
        content,
        confirmText,
        cancelText,
        confirmColor: '#0099ff',
        cancelColor: '#ff0000',
        success: res => {
            return res
        }
    });
}
