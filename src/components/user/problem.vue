<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<ul>
			<li class="clear single" v-for="item in securityList">
				<p class="pull-left title">{{ item.title }}</p>
				<img class="pull-right" :src="iconRight" alt="" />
			</li>
		</ul>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data() {
			return {
				iconRight: require('../../assets/common/arrow_right.png'),
				msg: '常见问题',
				securityList: [
					{
						title: '1. 智能乐居APP如何添加新设备?'
					},
					{
						title: '2. 什么是场景模式?'
					},
					{
						title: '3. 什么是设备联动?'
					},
					{
						title: '4. 什么是设备安防?'
					},
					{
						title: '5. 设备离线怎么办?'
					},
					{
						title: '6. 怎样共享设备?'
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
		padding: 1rem;
		border-bottom: 1px solid #f2f2f2;
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