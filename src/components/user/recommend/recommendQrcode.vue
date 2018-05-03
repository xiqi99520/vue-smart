<template>
	<div class="share-qrcode">
		<p>邀请16人,奖励价值147元的充电宝</p>
		<img class="qrcode" :src="qrcode" alt="">
		<img class="logo" :src="logo" alt="">
	</div>
</template>

<script>
	export default {
		data(){
			return {
				qrcode: require('../../../assets/user/recommend/qrcode.png'),
				logo: require('../../../assets/user/recommend/logo.png')
			}
		}
	}
</script>

<style scoped>
	.share-qrcode {
		padding-top: 7rem;
	}
	.share-qrcode p {
		font-size: 1.2rem;
	}
	.share-qrcode .qrcode {
		width: 70%;
		margin: auto;
		margin-top: 3rem;
		margin-bottom: 2rem;
	}
	.share-qrcode .logo {
		height: 2rem;
	}
</style>