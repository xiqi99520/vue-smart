<template>
	<div class="login-bg" :style="'backgroundImage: url('+ loginBg +')'">
		<layer v-if="this.$store.state.isshow" :isStatus="this.$store.state.signInStatusNum" :msg="this.$store.state.signInStatus"></layer>
		<div class="login login-pos">
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
					<input type="text" ref="codes" placeholder="输入验证码" autocomplete="off" />
				</div>
				<div class="input-area get-verificatione" @click="getCode">获取验证码</div>
			</div>
			<div class="username input-area flex">
				<div class="icon">
					<img :src="setPsw" alt="">
				</div>
				<input type="password" ref="password" placeholder="设置密码" autocomplete="off" />
			</div>
			<div class="username input-area flex">
				<div class="icon">
					<img :src="surePsw" alt="">
				</div>
				<input type="password" ref="confirm" placeholder="确认密码" autocomplete="off" />
			</div>
			<button type="button" class="btn-login" @click="register">提交注册</button>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
	import layer from '../common/layer'
	export default {
		data() {
			return {
				loginBg: require('../../assets/user/login/login_bg.jpg'),
				phone: require('../../assets/user/login/phone.png'),
				password: require('../../assets/user/login/password.png'),
				setPsw: require('../../assets/user/login/set_psw.png'),
				surePsw: require('../../assets/user/login/sure_psw.png')
			}
		},
		methods: {
			...mapMutations(['getRegisterCode', 'submitRegister']),
			register(){
				this.submitRegister({number: this.$refs.phonenum.value, codes: this.$refs.codes.value, psw: this.$refs.password.value, surePsw: this.$refs.confirm.value});
			},
			getCode(){
				this.getRegisterCode({number: this.$refs.phonenum.value});
			}
		},
		components: {
			layer
		}
	}
</script>

<style scoped>
	.login-bg {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 50%;
		top: 0;
		background-size: cover;
		background-position: center;
		max-width: 480px;
    	-webkit-transform: translateX(-50%);
    	-moz-transform: translateX(-50%);
    	-o-transform: translateX(-50%);
    	transform: translateX(-50%);
	}
	.login-pos {
	    width: 80%;
	    position: absolute;
	    top: 48%;
	    left: 50%;
	    -webkit-transform: translate(-50%,-50%);
	    transform: translate(-50%,-50%);
	}
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