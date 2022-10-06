<template>
    <view class="" v-if="showMessage">
        <view class="content">
            <input type="text" class="" v-model="content" placeholder="骂人不可取">
            <button type="primary" @click="publish()" size="mini">发布</button>
        </view>
        <scroll-view class="" v-for="(item,index) in messageList" :key="item._id" scroll-y>
            <view class="box" :style="[getBgColor(index + Math.floor(Math.random() * 10))]">
                <view class="title">
                    <image :src="item.avatarUrl" mode=""></image>
                    <text class="name">{{item.nickName}}</text>
                </view>
                <view class="text">{{item.content}}</view>
                <view class="time">{{$u.timeFormat(item.createTime, 'yyyy年mm月dd日 hh时MM分ss秒')}}</view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
    import {
        mapState,
        mapGetters
    } from 'vuex';
    import * as cloudApi from '@/utils/cloudApi.js'
    export default {
        data() {
            return {
                content: '',
                messageList: [],
                userInfo: {},
                showMessage: true
            }
        },
        onLoad() {
            cloudApi.call({
                name: 'Message-Board',
                data: {
                    api: 'show'
                },
                success: (res) => {
                    this.showMessage = res.result.data[0].type
                    console.log(res.result.data[0].type);
                }
            })
            this.userInfo = uni.getStorageSync("userInfo") || getApp().globalData.userInfo
            this.getMessageList()
        },
        computed: {
            ...mapGetters('common', ['getBgColor']),
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
                        userInfo: this.userInfo
                    },
                    success: (res) => {
                        console.log(res);
                        // this.messageList.unshift({
                        //     _id: res.result.id,
                        //     content: this.content
                        // })
                        this.content = ''
                        this.getMessageList()
                    }
                })
            },
            getMessageList() {
                cloudApi.call({
                    name: "Message-Board",
                    data: {
                        api: 'getMessage'
                    },
                    success: (res) => {
                        this.messageList = res.result.data
                    }
                })
            }
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

        }
    }
</style>
