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
    import Vue from 'vue'
    export default {
        name: 'App',
        data(){
            return {
                transitionName: 'fade',
                isopen: false
            }
        },
        created() {
            
        },
        methods: {

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
    .text-left {
        text-align: left;
    }
    .text-right {
        text-align: right;
    }
    
    .white {
        background-color: #fff;
    }
    li{
        list-style: none;
    }

    .six-equals {
        width: calc(100%/6);
    }
    .quarter {
        width: 25%;
    }
    .trisection {
        width: calc(100%/3);
    }
    .half {
        width: 50%;
    }

    .smooth {
        min-height: 100vh;
        background-color: #fff;
        position: relative;
        z-index: 2;
        padding-bottom: 5rem;
    }
    .interval {
        height: .6rem;
        background-color: #f5f5f5;
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
    .blur {
        /* Chrome, Opera */
        -webkit-filter: blur(10px);

        -moz-filter: blur(10px);
        -ms-filter: blur(10px);
        filter: blur(10px);

        /* IE6~IE9 */
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);
    }

    .show {
        animation: toggleBlur .6s linear 0s 1 forwards;
    }

    @keyframes toggleBlur {
        0% {
            -webkit-filter: blur(10px);
            /* Chrome, Opera */
            -moz-filter: blur(10px);
            -ms-filter: blur(10px);
            filter: blur(10px);
            filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);
            /* IE6~IE9 */
        }
        100% {
            -webkit-filter: blur(0px);
            /* Chrome, Opera */
            -moz-filter: blur(0px);
            -ms-filter: blur(0px);
            filter: blur(0px);
            filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=0, MakeShadow=false);
            /* IE6~IE9 */
        }
    }
</style>
