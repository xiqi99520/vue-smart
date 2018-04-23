<template>
    <div class="index" :style="bgStyle">
        <div class="header clear">
            <div class="avatar pull-left">
                <img :src="avatarPic" alt="">
            </div>
            <div class="menu-add pull-right" @click="addUrl">
                <img :src="iconAdd" alt="">
            </div>
        </div>
        <div class="attributes">
            <div class="basic flex">
                <div class="weather">
                    <span>16</span>℃
                </div>
                <div class="city">
                    <p>深圳市.南山区</p>
                    <p>多云</p>
                </div>
            </div>
            <div class="temperature flex">
                <div>室内温度 24℃</div>
                <span></span>
                <div>室内湿度 60%</div>
                <span></span>
                <div>室内PM 40</div>
            </div>
        </div>
        <mainModule :curUrl="curUrl"></mainModule>
        <indexnav :curname="curName"></indexnav>
    </div>
</template>

<script>
    import mainModule from './main'
    import indexnav from '../common/navFooter'
    export default {
        name: 'Index',
        data () {
            return {
                avatarPic: require('../../assets/index/avatar.png'),
                iconAdd: require('../../assets/index/add.png'),
                bgStyle: {
                    backgroundImage: "url(" + require("../../assets/index/index_bg.png") + ")"
                },
                curName: '乐家',
            }
        },
        components: {
            indexnav,
            mainModule
        },
        methods: {
            addUrl(){
                this.$router.push({path: '/addEqu'});
            }
        },
        computed: {
            curUrl: function () {
                switch( this.$route.fullPath ) {
                    case '/' :
                        return 0;
                        break;
                    case '/home' :
                        return 1;
                        break;
                    case '/bed' :
                        return 2;
                        break;
                    case '/study' :
                        return 3;
                        break;
                    default :
                        return 4;
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    h1, h2 {
      font-weight: normal;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }
    a {
      color: #42b983;
    }
    .index {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 1;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        background-position: center;
        background-size: cover;
    }
    .header {
        padding: 1rem;
    }
    .avatar img {
        width: 2.5rem;
    }
    .menu-add img {
        width: 1.4rem;
        margin-top: 0.3rem;
    }
    .attributes {
        color: #fff;
        padding: 0 1rem;
    }
    .attributes .basic {
        height: 3.8rem;
    }
    .attributes .city {
        text-align: left;
        margin-left: .8rem;
    }
    .attributes .city p {
        font-size: .9rem;
        line-height: 1.6rem;
    }
    .weather {
        position: relative;
        top: -.8rem;
    }
    .weather span {
        font-size: 4rem;
    }
    .temperature {
        font-size: .9rem;
    }
    .temperature span {
        display: inline-block;
        border-left: 1px solid #fff;
        margin: 0 .8rem;
    }
</style>
