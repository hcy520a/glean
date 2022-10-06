<script>
    export default {
        onLaunch: function() {
            console.log('App Launch')
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        },
        globalData: {
            wxUserInfo: {},
            token: null || uni.getStorageSync('token'),
        }
    }
</script>

<style>
    /* icon图标 */
    @import "@/style/iconfont.css";
    /* 彩色icon图标 */
    @import "@/style/iconfont-weapp-icon.css";

    /*每个页面公共css */
    page {
        background-color: #f5f5f5;
    }
</style>
