<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<div class="info">
			<p>称呼</p>
			<input type="text" placeholder="输入用户称呼">
			<p>账号</p>
			<input type="text" placeholder="输入手机号/邮箱">
		</div>
		<button class="btn-add-family">添加家人</button>
		<p class="attention">如果对方账号没有绑定手机,请邀请您的好友绑定手机号码</p>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				msg: '新增家人'
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.info {
		padding: 1rem;
	}
	.info p {
		font-size: .9rem;
		text-align: left;
		margin-top: 1rem;
		margin-bottom: .4rem;
	}
	.info input {
		width: calc(100% - .4rem);
		height: 2.5rem;
		line-height: 2.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding-left: .4rem;
	}
	.btn-add-family {
		width: calc(100% - 2rem);
		height: 3rem;
		line-height: 3rem;
		font-size: .9rem;
		text-align: center;
		background-color: #ff9c00;
		color: #fff;
		border: none;
		border-radius: 4px;
		margin: auto;
	}
	.attention {
		width: 90%;
		font-size: .8rem;
		color: #b2b2b2;
		margin: auto;
		margin-top: .8rem;
	}
</style>