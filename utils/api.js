// 封装uni.showToast()函数
export const showToast = (msg, type) => {
    uni.showToast({
        title: msg,
        icon: type
    })
}
