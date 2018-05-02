<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<p class="desc">共享设备和家人一起享受智能生活</p>
		<div class="share-user">
			<p>账号</p>
			<input type="text" placeholder="输入手机号/邮箱">
		</div>
		<button class="btn-ok">确定</button>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				msg: '新添设备共享',
				backurl: '/user'
			}
		},
		components: {
			publicHead
		},
		
	}
</script>
	
<style scoped>
	.desc {
		font-size: .9rem;
		text-align: center;
		padding: 3rem 0;
	}
	.share-user {
		padding: 0 1rem;
		text-align: left;
	}
	.share-user p {
		margin-bottom: .4rem;
	}
	.share-user input {
		display: block;
		width: calc(100% - .4rem);
		height: 2.4rem;
		line-height: 2.4rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		margin: auto;
		padding-left: .4rem;
	}
	.btn-ok {
		width: calc(100% - 2rem);
		height: 2.4rem;
		color: #fff;
		font-size: .9rem;
		text-align: center;
		border: none;
		border-radius: 4px;
		background-color: #ff9c00;
		margin: auto;
		margin-top: 3rem;
	}
</style>