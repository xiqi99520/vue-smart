<template>
	<div class="area clear">
		<div class="pull-left trisection single-scene" v-for="item in sceneAll">
			<img class="icons" :src="item.icon" :alt="item.title">
			<p class="title">{{ item.title }}</p>
			<router-link to="/">编辑场景</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				sceneAll: [
					{
						icon: require('../../../assets/scenes/home_scene_gohome.png'),
						title: '回家场景'
					},
					{
						icon: require('../../../assets/scenes/home_scene_lijia.png'),
						title: '离家场景'
					},
					{
						icon: require('../../../assets/scenes/home_scene_sleep.png'),
						title: '睡眠场景'
					},
					{
						icon: require('../../../assets/scenes/home_scene_getup_night.png'),
						title: '起床场景'
					}
				]
			}
		}
	}
</script>

<style scoped>
	.single-scene .icons {
		width: 4rem;
		margin: 1.2rem 0 .3rem 0;
	}
	.single-scene .title {
		font-size: .8rem;
	}
	.single-scene .router-link-active {
		display: inline-block;
		font-size: .6rem;
		border: 1px solid #f1f1f1;
		border-radius: 4px;
		padding: .2rem .6rem;
		margin-top: .4rem;
	}
	.area {
		padding-bottom: 5rem;
	}
</style>