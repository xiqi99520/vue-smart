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
				msg: '安防设置',
				securityList: [
					{
						title: '外出安防'
					},
					{
						title: '撤防'
					},
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
</style>