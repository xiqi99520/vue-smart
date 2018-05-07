<template>
	<div class="sign-in-rule">
		<publicHead :title="msg"></publicHead>
		<div class="rule white">
			<h5>签到规则</h5>
			<p>连续签到1天 5积分</p>
			<p>连续签到2天 6积分</p>
			<p>连续签到3天 7积分</p>
			<p>连续签到4天 8积分</p>
			<p>连续签到5天 9积分</p>
			<p>连续签到6天 10积分</p>
			<p>连续签到7天 11积分</p>
			<p>连续签到7天以后按下一周计算,以此循环</p>
			<p>单天签到1天 5积分</p>
			<p>连续签到几天,中间断开,后面从第一天开始计算</p>
		</div>
		<div class="single white">
			<h5>1.什么是积分?</h5>
			<p>乐居智家的积分是乐居智家的用户对签到等行为的奖励。</p>
		</div>
		<div class="single white">
			<h5>2.积分能干什么?</h5>
			<p>1.在乐居智家的积分商城中免费兑换礼品以及其他专属优惠。</p>
			<p>2.在积分商城中参与抽奖，奖品很丰厚哦！</p>
		</div>
		<div class="single white">
			<h5>3.如何获得更多积分?</h5>
			<p>目前只要完成注册、签到或者邀请好友，就能获得相应积分。</p>
		</div>
		<div class="single white">
			<h5>4.积分的其他问题?</h5>
			<p>积分来源和支出可以在记录中查看。</p>
		</div>
		<div class="single white">
			<h5>5.积分的期限?</h5>
			<p>乐居智家积分有效期为一年，当年产生的积分在下个自然年12月31日前有效，逾期将作废。</p>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				msg: '积分规则'
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.sign-in-rule {
		color: #000;
		text-align: left;
		background-color: #f2f2f2;
	}
	.rule {
		font-size: .8rem;
		line-height: 1.8rem;
		padding: .8rem;
	}
	.rule h5,.single h5 {
		font-size: 1rem;
	}
	.single {
		font-size: .8rem;
		line-height: 1.4rem;
		padding: 1.2rem .8rem;
		margin-top: .7rem;
	}
	.single h5 {
		margin-bottom: .2rem;
	}
</style>