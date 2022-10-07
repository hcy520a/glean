<template>
    <view class="content">
        <view class="UCenter-bg">
            <view @click="isUserType()">
                <image class="png" mode="widthFix"
                    :src="userInfo.avatarUrl ? userInfo.avatarUrl : '/static/images/users.png'"></image>
                <view class="margin-top-sm nick_name">
                    <text>{{userInfo.nickName ? userInfo.nickName : '点击登录' }}</text>
                </view>

            </view>
            <!-- <view v-else>
				<image class="png" src="/static/images/users.png"></image>
				<view class="margin-top-sm nick_name">
					<text>请登录</text>
				</view>
			</view> -->


            <image class="gif-wave"
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-bac0ea58-fde2-44b8-9fbd-e07bb8738606/14843b8d-6ccc-45e8-b58b-03534ec660b0.gif">
            </image>

        </view>

        <view class="grace-body" v-if="userInfo.nickName">
            <view class="grace-grids-items" v-for="(item,index) in otherInfo" :key="index">
                <text :class="item.icon " class="midIcon"></text>
                <text class="grace-grids-text">{{item.name}}</text>
            </view>
        </view>


        <view class="botInfo">
            <button class="setItem" v-for="(item, index) in navs" :open-type="item.open_type" :key="index"
                @click="toPage(index)">
                <view class="setIcon">
                    <view class="t-icon set-t-icon" :class="item.icon"></view>
                </view>
                <view class="setInfo">
                    <text class="setName">{{ item.name }}</text>
                </view>

                <text class="iconfont icon-dayuhao icon2"></text>
            </button>
        </view>
        <!--  <u-modal v-model="userType" :content="userContent" mask-close-able title="登录用户类型" show-cancel-button
            confirm-text="学生" cancel-text="教师"></u-modal> -->
    </view>
</template>

<script>
    import * as cloudApi from '@/utils/cloudApi.js'
    import {
        getStudentList,
        getTeacherList,
        getNavList
    } from './otherInfo.js';
    export default {
        data() {
            return {
                userType: null, // 1 为学生 2 为老师
                userInfo: {
                    nickName: '',
                    avatarUrl: ''
                },
                otherInfo: [],
                navs: getNavList()
            }
        },
        onLoad() {

            uni.$on('refresh', () => {
                this.userInfo = uni.getStorageSync("userInfo") || getApp().globalData.userInfo
                if (this.userInfo) {
                    if (this.userInfo.userType == 1) this.otherInfo = getStudentList()
                    else this.otherInfo = getTeacherList()
                }
            });
            uni.$emit('refresh')
        },
        onShow() {
            console.log('onshow');
            uni.$emit('refresh')
        },
        methods: {
            isUserType() {
                if (!(this.userInfo === undefined)) return
                uni.showModal({
                    title: '登录用户类型',
                    content: '一旦选择，不可更改',
                    confirmText: '学生',
                    cancelText: '教师',
                    confirmColor: '#0099ff',
                    cancelColor: '#ff0000',
                    success: res => {
                        if (res.confirm) {
                            this.userType = 1
                            this.wxlogin()
                        } else {
                            this.userType = 2
                            this.wxlogin()
                        }
                    }
                });
            },
            toPage(index) {
                if (index === 0) {
                    this.updateUserInfo()
                }
                if (index === 3) {
                    uni.clearStorageSync()
                    getApp().globalData.userInfo = {}
                    this.userInfo = {}
                }
            },
            async wxlogin() {
                uni.login({
                    provider: 'weixin',
                    success: (res) => {
                        var code = res.code
                        cloudApi.call({ // 使用封装好的 
                            name: "login",
                            data: {
                                code,
                                userType: this.userType
                            },
                            success: (res) => {
                                console.log(res.result);
                                this.userInfo = res.result
                                this.$setGlobalCache(this.userInfo, "userInfo")
                                this.$setGlobalCache(this.userInfo.token, "token")

                                if (this.userInfo.userType == 1) this.otherInfo =
                                    getStudentList()
                                else this.otherInfo = getTeacherList()
                            }
                        })

                        // uniCloud.callFunction({ // 使用封装好的 
                        // 	name: "login",
                        // 	data: {
                        // 		code
                        // 	},
                        // 	success: (res) => {
                        // 		this.userInfo = res.result
                        // 	}
                        // })
                    }
                })
            },
            updateUserInfo() {
                uni.getUserProfile({ // 11月8日将不在提供头像和昵称信息
                    desc: "展示用户信息",
                    lang: 'zh_CN',
                    success: (res) => {
                        console.log(res);
                        // Object.assign()  合并具有相同属性的对象;第一个参数是目标对象，第二个参数为源对象
                        this.userInfo = Object.assign(this.userInfo, res.userInfo)
                        this.$setGlobalCache(this.userInfo, "userInfo")
                        this.$setGlobalCache(this.userInfo.token, "token")
                        cloudApi.call({
                            name: "updateUserInfo",
                            data: {
                                userInfo: this.userInfo
                            }
                        })
                    }
                })

            },
        }
    }
</script>

<style scoped lang="scss">
    .grace-body {
        width: 750rpx;
        background-color: #FFFFFF;
        display: flex;
        flex-direction: row;

    }

    .UCenter-bg {
        background-color: #0081ff;
        background-size: cover;
        height: 395rpx;
        display: flex;
        justify-content: center;
        overflow: hidden;
        position: relative;
        flex-direction: column;
        align-items: center;
        color: #fff;
        font-weight: 300;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }

    .UCenter-bg text {
        opacity: 0.8;
    }

    .UCenter-bg image {
        width: 200rpx;
        height: 200rpx;
    }

    .UCenter-bg image.png {
        border-radius: 50%;
    }

    .UCenter-bg .gif-wave {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 9;
        mix-blend-mode: screen;
        height: 100rpx;
    }

    .margin-top-sm {
        text-align: center;
    }

    .grace-grids-items {
        margin: 50rpx 0rpx 0rpx 50rpx;
        display: flex;
        flex-direction: column;

        .midIcon {
            color: #0da408;
            font-size: 60rpx;
            text-align: center;
        }
    }

    .grace-grids-items .grace-grids-text {
        font-size: 28rpx;
        line-height: 80rpx;
    }

    .nick_name {
        font-size: 32rpx;
    }

    .botInfo {
        background-color: #fff;
        border-radius: 0rpx 0 30rpx 30rpx;
        padding: 30rpx 20rpx;

        button::after {
            border: none;
        }

        button {
            background-color: #fff;
            border-radius: 0;
        }

        .setItem {
            position: relative;
            // 纵向排列
            display: flex;
            margin-bottom: 50rpx;
            height: 80rpx;
            line-height: 60rpx;
            color: #686868;

            .setIcon {
                display: flex;
                align-items: center;
                width: 60rpx;
                height: 60rpx;
                // border-radius: 50%;
                text-align: center;

                .set-t-icon {
                    width: 45rpx;
                    height: 45rpx;
                }
            }

            .setInfo {
                display: flex;
                // 改变flex布局 纵向排列
                flex-direction: column;
                margin-left: 20rpx;

                .setName {
                    font-size: 35rpx;
                }
            }

            .icon2 {
                position: absolute;
                right: 15rpx;
                color: #ccc;
                font-size: 40rpx;
            }
        }
    }
</style>
