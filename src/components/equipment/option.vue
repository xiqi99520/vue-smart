<template>
	<div>
		<publicHead :title="msg" :save="savemsg"></publicHead>
		<div class="interval"></div>
		<ul>
			<li class="flex area">
				<div class="half text-left">设备名称</div>
				<div class="half text-right">{{ this.$store.state.eqUl[this.$route.query.cur].name }}<img :src="iconRight" alt=""></div>
			</li>
			<li class="flex area">
				<div class="half text-left">所属房间</div>
				<div class="half text-right">默认房间<img :src="iconRight" alt=""></div>
			</li>
		</ul>
		<button class="btn-del">删除设备</button>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data(){
			return {
				msg: '常用设置',
				savemsg: '保存',
				iconRight: require('../../assets/common/arrow_right.png')
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.area {
		height: 3.4rem;
		line-height: 3.4rem;
		font-size: .9rem;
		padding: 0 .8rem;
		border-bottom: 1px solid #ddd;
	}
	.area img {
		height: 1rem;
		margin-left: .9rem;
		position: relative;
		top: .15rem;
	}
	.btn-del {
		width: 90%;
		height: 2.8rem;
		line-height: 2.8rem;
		text-align: center;
		color: #fff;
		font-size: .9rem;
		background-color: #ff8a00;
		border: none;
		border-radius: 6px;
		margin-top: 2.2rem;
	}
</style>