<template>
    <div id="app" v-cloak :style="{ 'overflow': this.$route.path == '/' ? 'hidden' : 'auto' }">
        <keep-alive>
            <transition :name="transitionName">
                <router-view :class="[isTransition ? 'child-view' : '']" />
            </transition>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {
                transitionName: '',
                isTransition: false
            }
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    a:link, a:hover, a:visited {
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
    [v-cloak]{ display:none} 
    .child-view {
      transition: all 30.6s ease;
    }
    .slide-left-enter, .slide-right-leave-active {
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
      -webkit-transform: translate(-100%, 0);
      transform: translate(-100%, 0);
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
