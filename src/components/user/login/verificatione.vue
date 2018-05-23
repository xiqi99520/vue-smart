<template>
	<div>
		<layer v-if="this.$store.state.isshow" :isStatus="this.$store.state.signInStatusNum" :msg="this.$store.state.signInStatus"></layer>
		<div class="login">
			<div class="username input-area flex">
				<div class="icon">
					<img :src="phone" alt="">
				</div>
				<input type="text" ref="phonenum" placeholder="请输入手机号" autocomplete="off" />
			</div>
			<div class="flex">
				<div class="password input-area flex">
					<div class="icon icon-verificatione">
						<img :src="password" alt="">
					</div>
					<input type="text" ref="codes" placeholder="输入密码" autocomplete="off" />
				</div>
				<div class="input-area get-verificatione" @click="getCode">获取验证码</div>
			</div>
			<button type="button" class="btn-login" @click="codeLogin">立即登入</button>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
	import layer from '../../common/layer'
	export default {
		data(){
			return {
				phone: require('../../../assets/user/login/phone.png'),
				password: require('../../../assets/user/login/password.png')
			}
		},
		methods: {
			...mapMutations(['getVerification', 'verificationLogin']),
			getCode(){
				this.getVerification({number: this.$refs.phonenum.value});
			},
			codeLogin(){
				this.verificationLogin({number: this.$refs.phonenum.value, codes: this.$refs.codes.value});
			}
		},
		components: {
			layer
		}
	}
</script>

<style scoped>
	.login img{
		width: 1rem;
		position: relative;
		top: .3rem;
	}
	.login input {
		width: 80%;
		height: 3rem;
		line-height: 3rem;
		color: #fff;
		border: none;
		outline: none;
		background-color: transparent;
	}
	.login .input-area {
		height: 3rem;
		line-height: 3rem;
		border-bottom: 1px solid #cbcbc7;
		padding-left: .5rem;
		margin-bottom: 1.8rem;
	}
	.login .icon {
		width: 20%;
		text-align: center;
	}
	.login .icon-verificatione {
		width: 40%;
	}
	.login .password {
		width: 60%;
	}
	.login .btn-login {
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		font-size: .9rem;
		text-align: center;
		color: #fff;
		background-color: #ff9c00;
		border: none;
		border-radius: 6px;
	}
	.get-verificatione {
		width: 39%;
		color: #ffba00;
		text-align: center;
		font-size: .9rem;
		margin-left: .8rem;
		padding-left: 0!important;
		cursor: pointer;
	}
	input::input-placeholder{color:#fff!important;} 

	input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
		color: #fff!important; 
	} 
	input:-moz-placeholder, textarea:-moz-placeholder { 
		color: #fff!important; 
	} 
	input::-moz-placeholder, textarea::-moz-placeholder { 
		color: #fff!important; 
	} 
	input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
		color: #fff!important; 
	} 
</style>