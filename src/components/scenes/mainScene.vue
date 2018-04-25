<template>
    <div>
        <div class="index" :style="bgStyle">
            <top></top>
            <basicData></basicData>
            <div class="scene-linkage">
                <div class="clear">
                    <div :class="['nav-menu','pull-left','scene-module',curUrl == 0 ? 'router-active': '']">
                        <router-link to="/scene">场景</router-link>
                    </div>
                    <div :class="['nav-menu','pull-right','linkage-module',curUrl == 1 ? 'router-active': '']">
                        <router-link to="/linkage">联动</router-link>
                    </div>
                </div>
                <div :class="['line',curUrl == 1 ? 'line-r': '']"></div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import top from '../common/headerModule'
    import basicData from '../common/basicData'
	export default {
		data(){
			return {
                bgStyle: {
                    backgroundImage: "url(" + require("../../assets/index/index_bg.png") + ")"
                },
				curName: '场景联动'
			}
		},
        components: {
            top,
            basicData
        },
        computed: {
            curUrl: function () {
                switch( this.$route.fullPath ) {
                    case '/scene' :
                        return 0;
                        break;
                    default :
                        return 1;
                        break;
                }
            }
        }
	}
</script>

<style scoped>
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
    .scene-linkage {
        width: 100%;
        min-height: calc(100% - 14rem);
        background-color: #fff;
        position: relative;
        top: 3rem;
    }
    .scene-linkage .nav-menu {
        width: 49%;
        border-bottom: 1px solid #999999;
    }
    .scene-linkage a {
        display: block;
        width: 100%;
        height: 100%;
        padding: .8rem 0;
    }
    .scene-linkage .router-active .router-link-active {
        color: #ff9c00;
    }
    .line {
        width: 49%;
        border-top: 1px solid #ff9c00;
        position: relative;
        top: -.1rem;
        transform: translateX(0);
        -webkit-transition: all .4s;
        -moz-transition: all .4s;
        -o-transition: all .4s;
        transition: all .4s;
    }
    .line-r {
        transform: translateX(104%);
    }
</style>