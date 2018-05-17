<template>
	<div>
		<publicHead :title="msg" :rightMenu="rightMenu" :toUrl="addHouse"></publicHead>
		<div class="no-equipement">
			<img :src="illustrations" alt="">
			<p>还未添加任何设备，不能进行相应操作</p>
		</div>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data() {
			return {
				msg: '房间管理',
				rightMenu: '添加',
				addHouse: '/addHouse',
				illustrations: require('../../assets/index/addhouse/illustrations.png')
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.no-equipement img {
		margin-top: 6rem;
		margin-bottom: 2rem;
	}
	.no-equipement p {
		font-size: .9rem;
	}
</style>