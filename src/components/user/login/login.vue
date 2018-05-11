<template>
	<div>
		<div class="login">
			<div class="username input-area flex">
				<div class="icon">
					<img :src="phone" alt="">
				</div>
				<input type="text" placeholder="请输入手机号" autocomplete="off" />
			</div>
			<div class="password input-area flex">
				<div class="icon">
					<img :src="password" alt="">
				</div>
				<input type="password" placeholder="输入密码" autocomplete="off" />
			</div>
			<div class="btn-login" @click="goto">登入</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data(){
			return {
				phone: require('../../../assets/user/login/phone.png'),
				password: require('../../../assets/user/login/password.png')
			}
		},
		computed: {
			...mapState(['user']),
		},
		methods: {
			...mapMutations(['modifyStatus']),
			goto(){
				let _this = this;
				_this.modifyStatus();
				if(_this.user){
					_this.$router.push({path: '/user'});
				}
			}
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
		border: none;
		color: #fff;
		background-color: transparent;
		outline: none;
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
	.login .btn-login {
		display: block;
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