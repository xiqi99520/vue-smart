<template>
    <div>
        <div class="index" :style="bgStyle">
            <top></top>
            <basicData></basicData>
            <router-view :curUrl="curUrl"></router-view>
        </div>
        <indexnav :curname="curName"></indexnav>
    </div>
</template>

<script>
    import top from '../common/headerModule'
    import basicData from '../common/basicData'
    import indexnav from '../common/navFooter'
    export default {
        name: 'Index',
        data () {
            return {
                bgStyle: {
                    backgroundImage: "url(" + require("../../assets/index/index_bg.png") + ")"
                },
                curName: '乐家'
            }
        },
        components: {
            top,
            basicData,
            indexnav
        },
        computed: {
            curUrl() {
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
        },
        mounted(){
            switch( window.location.pathname ) {
                case '/scene': 
                    this.curName = '场景联动';
                    break;
                case '/linkage': 
                    this.curName = '场景联动';
                    break;    
                default :
                    this.curName = '乐家';
                    break;
            }
        },
        watch: {
            '$route'(to,from){
                switch( to.path ) {
                    case '/scene': 
                        this.curName = '场景联动';
                        break;
                    case '/linkage': 
                        this.curName = '场景联动';
                        break;
                    default :
                        this.curName = '乐家';
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
</style>
