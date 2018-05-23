<template>
	<div class="login-bg" :style="'backgroundImage: url('+ loginBg +')'">
		<form class="login-pos">
			<router-view></router-view>
			<div class="clear more-menu">
				<div class="pull-left">
					<router-link to="/register">注册</router-link><span v-if="toggle"> | <router-link to="/password/0">忘记密码</router-link></span>
				</div>
				<div class="pull-right">
					<router-link v-if="toggle" to="/verificatione">验证码登入</router-link>
					<router-link v-if="!toggle" to="/login">密码登入</router-link>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginBg: require('../../assets/user/login/login_bg.jpg'),
			}
		},
        computed: {
            toggle() {
                switch( this.$route.fullPath ) {
                    case '/login' :
                        return true;
                        break;
                    default :
                        return false;
                        break;
                }
            }
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
		-moz-transform: translate(-50%,-50%);
		-o-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
	}
	.more-menu {
		font-size: .9rem;
		color: #fff;
		margin-top: 1.8rem;
		padding: 0 .8rem;
	}
	.more-menu a {
		color: #fff;
	}
</style>