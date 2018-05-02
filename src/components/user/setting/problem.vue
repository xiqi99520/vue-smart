<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<ul>
			<li class="clear single" v-for="item in securityList">
				<router-link :to="item.url"></router-link>
				<p class="pull-left title">{{ item.title }}</p>
				<img class="pull-right" :src="iconRight" alt="" />
			</li>
		</ul>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				iconRight: require('../../../assets/common/arrow_right.png'),
				msg: '常见问题',
				securityList: [
					{
						title: '1. 智能乐居APP如何添加新设备?',
						url: '/problemDetail/0'
					},
					{
						title: '2. 什么是场景模式?',
						url: '/problemDetail/1'
					},
					{
						title: '3. 什么是设备联动?',
						url: '/problemDetail/2'
					},
					{
						title: '4. 什么是设备安防?',
						url: '/problemDetail/3'
					},
					{
						title: '5. 设备离线怎么办?',
						url: '/problemDetail/4'
					},
					{
						title: '6. 怎样共享设备?',
						url: '/problemDetail/5'
					}
				]
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.single {
		position: relative;
		padding: 1rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.single a {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.single img {
		width:.5rem;
		position: relative;
		top: .1rem;
	}
	.single .title {
		font-size: .9rem;
	}
	.sign-toggle {
		border-top: 10px solid #f5f5f5;
		padding-top: 1.8rem;
		margin-top: 2rem;
		color: #f2a038;
	}
</style>