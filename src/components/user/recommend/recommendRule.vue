<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<div class="recommend-bg" :style="'backgroundImage: url('+ recommendBg +')'">

			<div class="rule">
				<h5 class="title"><img :src="iconHeader" alt=""><span>推荐规则</span></h5>
				<div class="rule-cont">
					<img class="icon-footer" :src="iconFooter" alt="">
					<ul>
						<li><img :src="first" alt="">点击推荐注册链接，推荐好友注册乐居智能会员；</li>
						<li><img :src="second" alt="">好友通过点击链接或者扫描二维码，注册乐居智家会员，即可参加推荐；</li>
						<li><img :src="third" alt="">好友成功注册后，成功登录后，您即可获得<span>500</span>积分，积分奖励将即时发放到您的积分账户；（每天推荐上限25000积分）</li>
						<li><img :src="fourth" alt="">直接提现或者在积分商城<span>兑换礼品</span></li>
						<li><img :src="fifth" alt="">积分兑换的商品，客服会在10个工作日内将商品寄出；</li>
						<li><img :src="sixth" alt="">乐居智家积分有效期为一年，当年产生的积分在下个自然年12月31日前有效，逾期将作废。</li>
						<li><img :src="seventh" alt="">活动最终解释权归盛世乐居（亚东）智能科技有限公司所有。</li>
					</ul>
				</div>
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
				recommendNumBg: require('../../../assets/user/recommend/recommend_num.png'),
				iconHeader: require('../../../assets/user/recommend/rule_header.png'),
				iconFooter: require('../../../assets/user/recommend/rule_footer.png'),
				first: require('../../../assets/user/recommend/first.png'),
				second: require('../../../assets/user/recommend/second.png'),
				third: require('../../../assets/user/recommend/third.png'),
				fourth: require('../../../assets/user/recommend/fourth.png'),
				fifth: require('../../../assets/user/recommend/fifth.png'),
				sixth: require('../../../assets/user/recommend/sixth.png'),
				seventh: require('../../../assets/user/recommend/seventh.png')
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
	.rule {
		width: 83%;
		border-radius: 10px;
		margin: auto;
		padding-top: 1.6rem;
		margin-bottom: 4rem;
		position: relative;
		top: 4.2rem;
	}
	.title {
		position: relative;
	}
	.title span {
		display: block;
		width: 100%;
		font-size: .9rem;
		position: absolute;
		left: 0;
		top: 1.2rem;
	}
	.title img {
		width: 100%;
	}
	.rule-cont {
		margin-top: .5rem;
		box-shadow: 1px 1px 10px #ccc;
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
		background-color: #fff;
		padding-bottom: 2rem;
	}
	.rule-cont ul {
		width: 85%;
		margin: auto;
	}
	.rule-cont li {
		font-size: .9rem;
		text-align: justify;
		line-height: 1.4rem;
		margin-bottom: .8rem;
		word-wrap: break-word;
	}
	.rule-cont li span {
		color: #ff9c00;
    	font-size: 1.1rem;
	}
	.rule-cont img {
		width: 1.3rem;
		margin-right: .4rem;
		position: relative;
		top: 0;
		float: left;
	}
	.rule-cont .icon-footer {
		width: 100%;
		position: relative;
		top: -.69rem;
	}
</style>