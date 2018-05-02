<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<div class="recommend-bg" :style="'backgroundImage: url('+ recommendBg +')'"></div>
		<div class="invite">
			<p class="header">邀请<span>16</span>人,奖励价值<span>147</span>元充电宝</p>
			<img class="giftPic" :src="giftPic" alt="">
			<p class="person-num">成功邀请人数</p>
			<div class="invite-num" :style="'backgroundImage: url('+ recommendNumBg +')'">0</div>
			<p class="invite-code">我的邀请码: 18888</p>
			<span class="rule">查看奖励规则 &gt;</span>
			<div class="btn-group clear">
				<button class="pull-left btn">分享二维码</button>
				<button class="pull-right btn">马上邀请好友</button>
			</div>
			<router-link class="recruit" to="/">产品体验官招募 &gt;</router-link>
			<div class="integral clear">
				<div class="pull-left">已获得积分: <span class="num">0</span>分</div>
				<div class="pull-right btn-find">查看 &gt;</div>
			</div>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				msg: '推荐有礼',
				recommendBg: require('../../../assets/user/recommend/recommend_bg.png'),
				giftPic: require('../../../assets/user/recommend/charge.jpg'),
				recommendNumBg: require('../../../assets/user/recommend/recommend_num.png')
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.recommend-bg {
		width: 100%;
		height: 100vh;
		position: absolute;
		left: 0;
		top: 0;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.invite {
		width: 86%;
		box-shadow: 1px 1px 10px #ccc;
		border-radius: 10px;
		background-color: #fff;
		margin: auto;
		padding-top: 1.6rem;
		margin-bottom: 4rem;
		position: relative;
		top: 3.5rem;
	}
	.invite .header {
		font-size: .95rem;
		letter-spacing: .1rem;
		margin-bottom: 1rem;
	}
	.invite .header span {
		font-size: 1.2rem;
		color: #ff9c00;
	}
	.invite .giftPic {
		width: 11rem;
	}
	.invite .person-num {
		font-size: .95rem;
		margin-top: 1rem;
	}
	.invite .invite-num {
		width: 5.5rem;
		height: 5.5rem;
		line-height: 5.5rem;
		font-size: 2.5rem;
		color: #fff;
		margin: auto;
		margin-top: 1rem;
		margin-bottom: 1rem;
		background-size: contain;
	}
	.invite .invite-code {
		font-size: .9rem;
	}
	.invite .rule {
		display: block;
		font-size: .8rem;
		color: #777;
		margin: .8rem 0;
	}
	.btn-group {
		width: 80%;
		margin: 2rem auto;
	}
	.btn-group .btn {
		width: 45%;
		height: 2.4rem;
		color: #fff;
		border: none;
		border-radius: 20px;
    	background-color: #ff9c00;
	}
	.recruit {
		display: block;
		width: 84%;
		font-size: .95rem;
		margin: auto;
		padding-bottom: 1.6rem;
		border-bottom: 1px dashed #ffe183;
	}
	.integral {
		width: 84%;
		font-size: .95rem;
		letter-spacing: .07rem;
		margin: auto;
		margin-top: 1.6rem;
		padding-bottom: 1.6rem;
	}
	.integral .num {
		font-size: 1.2rem;
		color: #ff9c00;
	}
	.integral .btn-find {
		color: #999;
	}
</style>