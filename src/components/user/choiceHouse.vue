<template>
	<div>
		<publicHead :title="msg" :rightMenu="rightMenu"></publicHead>
		<ul>
			<li class="clear choice" v-for="item in securityList">
				<router-link :to="item.url"></router-link>
				<img class="pull-left house-avatar" :src="item.src" alt="">
				<p class="pull-left title">{{ item.title }}</p>
				<img class="pull-right arrow-right" :src="iconRight" alt="" />
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
				msg: '选择房屋',
				rightMenu: '创建',
				securityList: [
					{
						title: '我的房屋(默认)',
						url: '/houseManage/我的房屋(默认)',
						src: require('../../assets/index/avatar.png')
					},
					{
						title: '我的房屋1',
						url: '/houseManage/我的房屋1',
						src: require('../../assets/index/avatar.png')
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
	.choice {
		position: relative;
		padding: .6rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.choice a {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.choice .arrow-right {
		width:.5rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		margin-top: -.5rem;
	}
	.choice .title {
		height: 2.4rem;
		line-height: 2.4rem;
		font-size: .9rem;
		margin-left: 1rem;
	}
	.choice .house-avatar {
		width: 2.4rem;
		height: 2.4rem;
	}
</style>