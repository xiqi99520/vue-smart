<template>
	<div class="scene-linkage">
        <div class="flex">
            <div class="scene-module">场景</div>
            <div class="linkage-module">联动</div>
        </div>
        <router-view />
    </div>
</template>

<script>
	export default {
		props: {
			curUrl: Number
		},
		data(){
			return {
				sideNavIcons: [
                    {
                        pic: require('../../assets/index/icon_default.png'),
                        active: require('../../assets/index/active_default.png'),
                        url: '/'
                    },
                    {
                        pic: require('../../assets/index/icon_living.png'),
                        active: require('../../assets/index/active_living.png'),
                        url: '/home'
                    },
                    {
                        pic: require('../../assets/index/icon_bed.png'),
                        active: require('../../assets/index/active_bed.png'),
                        url: '/bed'
                    },
                    {
                        pic: require('../../assets/index/icon_study.png'),
                        active: require('../../assets/index/active_study.png'),
                        url: '/study'
                    },
                    {
                        pic: require('../../assets/index/icon_room.png'),
                        active: require('../../assets/index/active_room.png'),
                        url: '/room'
                    },
                ]
			}
		}
	}
</script>

<style scoped>
	.side-nav {
        width: 100%;
        height: 57vh;
        position: absolute;
        bottom: 4.5rem;
    }
    .side-nav ul {
        width: 3rem;
        background: rgba(255,255,255,.9);
        height: 95%;
        border-radius: 6px;
        margin-left: .7rem;
        position: absolute;
        top: 1rem;
    }
    .side-nav li {
        display: block;
        height: calc(100%/5);
        background-repeat: no-repeat;
        background-size: 1.4rem;
        background-position: center;
    }
    .side-nav li a {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .side-nav .first {
        border-bottom: 1px solid #cccccc;
    }
    .side-nav .last {
        border-top: 1px solid #cccccc;
    }
</style>