<template>
    <div class="schedule">
        <publicHead :title="msg"></publicHead>
        <div class="info">
            <p>扫描下方工作人员二维码或</p>
            <p>添加微信号 ljzn01</p>
            <p>进行查询商品兑换进度</p>
            <img :src="qrcode" alt="">
        </div>
    </div>
</template>
<script>
import publicHead from '../../common/publicHeader'
export default {
    data() {
        return {
            msg: '商品兑换进度',
            qrcode: require('../../../assets/user/integral/progress.jpg')
        }
    },
    components: {
        publicHead
    }
}
</script>
<style scoped>
.schedule .info {
    margin-top: 5rem;
}

.schedule p {
    line-height: 2rem;
}

.schedule img {
    margin-top: 1rem;
}
</style>