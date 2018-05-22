<template>
    <div>
        <publicHead :title="msg"></publicHead>
        <div class="shopBg" :style="'backgroundImage: url('+ bg +')'"></div>
        <a href="https://h5.youzan.com/v2/showcase/homepage?alias=jvkc4u7n" class="toShop"></a>
    </div>
</template>
<script>
import publicHead from '../common/publicHeader'
export default {
    data() {
        return {
            bg: require('../../assets/user/shopping.jpg'),
            msg: '乐居商城'
        }
    },
    components: {
        publicHead
    }
}
</script>
<style scoped>
.shopBg {
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.toShop {
    display: block;
    width: 100%;
    height: 4rem;
    position: absolute;
    left: 0;
    top: calc(100vh - 4rem);
}
</style>