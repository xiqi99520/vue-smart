<template>
	<div class="opinion" :style="'backgroundImage: url('+ opinionBg +')'">
		<publicHead :title="msg"></publicHead>
		<div class="contact">
			<p>400-1539-888</p>
			<a href="tel:400-1539-888">呼叫</a>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				msg: '意见反馈',
				opinionBg: require('../../../assets/user/complain.png')
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.opinion {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-position: center;
		background-size: cover;
	}
	.contact {
		width: 80%;
		position: fixed;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	.contact p {
		font-size: 1.6rem;
		color: #fff;
	}
	.contact a {
		display: block;
		width: 100%;
		color: #fff;
		border-radius: 6px;
		background-color: #ff9c00;
		margin-top: 1.5rem;
		padding: .7rem 0;
	}
</style>