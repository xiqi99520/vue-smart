<template>
	<div class="m-home">
        <commonScenes :bindingEqu="bindingEqu" :basicInfo="basicInfo"></commonScenes>
    </div>	
</template>

<script>
	import commonScenes from '../../common/commonScenes'
	export default {
		data(){
			return {
				basicInfo: {
					title: '卧室',
					num: 2
				},
				bindingEqu: [
					{
						name: '小白机器人',
						date: '12:06',
						pic: require('../../../assets/index/automaton_nor.png'),
						picActive: require('../../../assets/index/automaton_pre.png')
					},
					{
						name: '音乐面板',
						date: '',
						pic: require('../../../assets/index/music_nor.png'),
						picActive: require('../../../assets/index/music_pre.png')
					}
				]
			}
		},
		components: {
			commonScenes
		}
	}
</script>

<style scoped>
	.m-home {
        padding-left: 4.4rem;
        text-align: left;
    }
</style>