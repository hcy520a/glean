<template>
    <view class="content">
        <view class="search">
            <u-search placeholder="它说你任何为人称道的美丽" placeholder-class="placeholder" :showAction="false" bgColor="#ffffff"
                v-model="keyword" height="90" margin="10rpx 0" @clear="keyword = ' '" search-icon-color="#0da408">
            </u-search>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                keyword: ''
            }
        },
        computed: {
            count() {
                return this.$store.state.count
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .content {
        .search {
            padding: 30rpx 50rpx;

            .placeholder {
                font-size: 38rpx;
            }
        }
    }
</style>
