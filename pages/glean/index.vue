<template>
    <view class="">
        <view class="content">
            <input type="text" class="" v-model="content" placeholder="骂人不可取">
            <button type="primary" @click="publish()" size="mini">发布</button>
        </view>
        <scroll-view class="" v-for="item in messageList" :key="item._id" scroll-y>
            <view class="box" :style="{'backgroundColor':randColor}">
                <view class="title">
                    <image :src="item.avatarUrl" mode=""></image>
                    <text class="name">{{item.nickName}}</text>
                </view>
                <view class="text">{{item.content}}</view>
                <view class="time">2022年10月5日 23：08</view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
    // import {
    //     useCounterStore
    // } from '@/store/message.ts' // 导入存储库
    // const counter = useCounterStore() // 得到存储库
    import * as cloudApi from '@/utils/cloudApi.js'
    export default {
        data() {
            return {
                content: '',
                messageList: [],
                userInfo: {}
            }
        },
        onLoad() {

            this.userInfo = uni.getStorageSync("userInfo")
            cloudApi.call({
                name: "Message-Board",
                data: {
                    api: 'getMessage'
                },
                success: (res) => {
                    this.messageList = res.result.data
                }
            })
        },
        computed: {
            randColor() { // pinia 用不了的话 只能在 发布留言的时候添加颜色了
                let colorList = ['#e54d42', '#f37b1d', '#fbbd08', '#8dc63f', '#39b54a', '#1cbbb4', '#0081ff', '#6739b6',
                    '#9c26b0', '#e03997'
                ];
                let index = Math.floor(Math.random() * colorList.length)

                return colorList[index]
            },
        },
        methods: {

            publish() {
                // 发布内容需要登录
                if (!this.content) return this.$showToast('留言内容不能为空哦', 'none')
                cloudApi.call({
                    name: "Message-Board",
                    data: {
                        api: 'publish',
                        content: this.content,
                        nickName: this.userInfo.nickName,
                        avatarUrl: this.userInfo.avatarUrl
                    },
                    success: (res) => {
                        this.messageList.push({
                            _id: res.result.id,
                            content: this.content
                        })
                        this.content = ''
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        align-items: center;
        margin: 20rpx 40rpx;

        input {
            border-bottom: 1px solid #ccc;
            padding: 6rpx;
            flex: 1;
        }
    }

    .box {
        margin: 10rpx 40rpx;
        padding: 20rpx;

        border-radius: 30rpx;

        .title {
            display: flex;
            align-items: center;

            image {
                width: 100rpx;
                height: 100rpx;
                border: 5rpx solid #fff;
                border-radius: 50%;
                margin-right: 20rpx;
            }

            .name {
                color: #ff6773;
                font-weight: bold;
                font-size: 40rpx;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 40vw;
            }
        }

        .text {
            padding: 30rpx 40rpx 0;

        }

        .time {
            margin-top: 10rpx;
            font-size: 24rpx;
            color: #ccc;
        }
    }
</style>
