<template>
	<div>
		<layer v-if="this.$store.state.isshow" :isStatus="this.$store.state.signInStatusNum" :msg="this.$store.state.signInStatus"></layer>
		<publicHead :title="msg"></publicHead>
		<div class="psw">
			<input type="text" ref="phonenum" placeholder="请输入手机号" />
			<div class="flex verification">
				<input class="code" type="text" ref="codes" placeholder="请输入验证码" />
				<span class="title" @click="fixCode">获取验证码</span>
			</div>
			<input type="password" ref="password" placeholder="请输入新密码" />
			<input type="password" ref="confirm" placeholder="请确认新密码" />
			<button class="btn-modify" @click="getfix">立即修改</button>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	import layer from '../../common/layer'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				msg: this.$route.params.id == 1 ? '修改密码' : '忘记密码'
			}
		},
		components: {
			publicHead,
			layer
		},
		methods: {
			...mapMutations(['submitFix', 'getFixCode']),
			getfix(){
				this.submitFix({number: this.$refs.phonenum.value, codes: this.$refs.codes.value, psw: this.$refs.password.value, surePsw: this.$refs.confirm.value});
			},
			fixCode(){
				this.getFixCode({number: this.$refs.phonenum.value});
			}
		}
	}
</script>

<style scoped>
	.psw {
		margin-top: 1rem;
	}
	.psw input {
		width: 88%;
		height: 2.2rem;
		border-radius: 4px;
		border: 1px solid #ccc;
		margin: .6rem auto;
		padding-left: .4rem;
	}
	.psw .btn-modify {
		width: 90%;
		height: 2.4rem;
		color: #ff9c00;
		border: 1px solid #ff9c00;
		border-radius: 4px;
		background-color: #fff;
		margin-top: .6rem;
	}
	.verification {
		width: 90%;
		margin:auto;
	}
	.verification .code {
		width: 70%;
		margin: .6rem 0;
	}
	.verification .title {
		width: 30%;
		height: 3.4rem;
		line-height: 3.4rem;
		font-size: .9rem;
		text-align: center;

	}
</style>