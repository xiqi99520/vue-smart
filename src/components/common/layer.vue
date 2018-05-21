<template>
	<div>
		<div class="layer">
			<img :src="[isStatus ? iconSuccess : iconFail]" alt="">
			<p>{{ msg }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			msg: String,
			isStatus: Number
		},
		data(){
			return {
				iconSuccess: require('../../assets/common/success.png'),
				iconFail: require('../../assets/common/fail.png')
			}
		}
	}
</script>

<style scoped>
	.layer {
		width: 55%;
		color: #fff;
		text-align: center;
		border-radius: 10px;
		background: rgba(0,0,0,.6);
		padding: 2.5rem 0;
		position: fixed;
		top: 46%;
		left: 50%;
		-webkit-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		-o-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
		z-index: 999;
	}
	.layer img {
		width: 4.6rem;
		margin-bottom: .6rem;
	}
</style>