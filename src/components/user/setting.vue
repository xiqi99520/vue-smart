<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<ul>
			<li class="clear single" v-for="item in securityList" :data-url="item.url" @click="toUrl(item.url)">
				<p class="pull-left title">{{ item.title }}</p>
				<img class="pull-right" :src="iconRight" alt="" />
			</li>
		</ul>
		<div class="sign-toggle">退出登入</div>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data() {
			return {
				iconRight: require('../../assets/common/arrow_right.png'),
				msg: '设置',
				securityList: [
					{
						title: '关于我们',
						url: '/about'
					},
					{
						title: '意见反馈',
						url: '/opinion'
					},
					{
						title: '修改密码',
						url: '/password/1'
					},
					{
						title: '常见问题',
						url: '/problem'
					}
				]
			}
		},
		components: {
			publicHead
		},
		methods: {
			toUrl(url){
				this.$router.push(url)
			}
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