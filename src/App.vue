<template>
    <div id="app" v-cloak :style="{ 'overflow': this.$route.path == '/' ? 'hidden' : 'auto' }">
        <keep-alive>
            <transition :name="transitionName" mode="out-in">
                <router-view></router-view>
            </transition>
        </keep-alive>
    </div>
</template>

<script>
    // import './components/sdk/js-sdk'
    export default {
        name: 'App',
        data(){
            return {
                transitionName: 'fade'
            }
        },
        created() {
            this.init();
        },
        methods: {
            //初始化sdk
            init(cThis){
               /* ws = new XSDK('mqtt', {
                    type: 'app',
                    host: 'ws://118.190.126.197:1884/mqtt',
                    userid: GetCookie("user_id"), // 用户在云智易平台的user_id，通过获取OpenID接口获取
                    authorize: GetCookie("authorize"), // 用户在云智易平台的authorize，通过获取OpenID接口获取
                    keepAliveInterval: 40, // 非必填，mqtt通讯时长，默认为40s，每40s发送ping请求
                });

                ws.on('ready', function() {
                    console.log('成功连上了');
                    console.log(devices);
                    ws && ws.emit('adddevices', devices) //_devices 表示用户绑定设备列表
                });*/
            }
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    a:link,
    a:hover,
    a:visited {
        color:#2c3e50;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-user-select: none;
        -moz-user-focus: none;
        -moz-user-select: none;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100vh;
        max-width: 480px;
    }
    .shade {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.5);
        z-index: -1;
    }
    .hide {
        display: none!important;
    }
    .flex {
        display: flex;
    }
    .clear {
        overflow: hidden;
    }
    .pull-left {
        float: left;
    }
    .pull-right {
        float: right;
    }
    .white {
        background-color: #fff;
    }
    li{
        list-style: none;
    }
    .trisection {
        width: calc(100%/3);
    }
    .six-equals {
        width: calc(100%/6);
    }
    .smooth {
        min-height: 100vh;
        background-color: #fff;
        position: relative;
        z-index: 2;
        padding-bottom: 5rem;
    }
    .smooth .header {
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        padding: .8rem 0;
        font-size: 1rem;
        border-bottom: 1px solid #f2f2f2;
    }
    .distpicker-address-wrapper select {
        width: 30%;
        padding: .1rem .75rem!important;
        height: 30px!important;
        font-size: .9rem!important;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all .1s ease;
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
    @media(min-width: 480px) {
        #app{
            position: relative;
            left: 50%;
            margin-left: -240px;
        }
        .smooth {
            padding-bottom: 0;
        }
    }
</style>
