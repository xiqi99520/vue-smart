<template>
	<div class="address-area">
		<publicHead :title="msg"></publicHead>
		<div class="address white" :style="'backgroundImage: url('+ addressLace +')'">
			<router-link to="/addAddress">
				<div class="no-address hide">
					<span>+</span>添加地址
				</div>
				<div class="have-address flex">
					<div class="icon-area">
						<img class="icon-address" :src="iconAddress" alt="">
					</div>
					<div class="info">
						<p class="choice-address"><span class="address-info">收货地址:{{ addressInfo.province + addressInfo.city + addressInfo.area + addressInfo.addressName }}</span><span class="focus pull-right">默认</span></p>
						<p class="clear">
							<span class="pull-left">收货人: {{ addressInfo.userName }}</span>
							<span class="pull-right">手机: {{ addressInfo.phone }}</span>
						</p>
					</div>
					<div class="icon-footer">
						<img :src="nextIcon" alt="">
					</div>
				</div>
			</router-link>
		</div>
		<div class="goods-info white flex">
			<div class="pic" :style="'backgroundImage:url('+ curGiftInfo.imageUrl1 +')'"></div>
			<div class="info">
				<p>{{ curGiftInfo.goodsName }}</p>
				<p>{{ curGiftInfo.integral }}积分</p>
			</div>
		</div>
		<div class="integral" style="overflow: hidden; display: block;">
			<div class="integral-header flex">
				<span class="t-left">您的积分</span>
				<span class="t-right"><em id="integral">30</em>积分</span>
			</div>
			<div class="integral-enter">
				<p>请输入所需抵扣积分</p>
				<input type="text" id="inputs">
			</div>
			<div class="integral-rule">
				<ul>
					<li><span></span>1元=100积分</li>
					<li><span></span>输入积分仅支持100的正整数倍</li>
					<li><span></span>如您的积分不足100,可获取更多积分再兑换</li>
					<li><span></span>如您选择积分+微信支付，但微信支付失败，平台暂时不会退回已扣积分，请知悉！</li>
				</ul>
			</div>
		</div>
		<div class="deduction-integral flex" id="deductionIntegral" style="opacity: 1;">
			<span class="t-left half">抵扣积分</span>
			<span class="t-right half"><em id="inputVal">0</em>积分</span>
		</div>
		<div class="pay-money flex" id="payMoney" style="opacity: 1;">
			<span class="t-left half">应付金额</span>
			<span class="t-right half">¥<em id="pay">29</em></span>
		</div>
		<div class="order-area flex white">
			<div class="total">
				<span class="text-red">合计: {{ curGiftInfo.integral }}积分</span>
			</div>
			<button class="btn-order" @click="toPay">去结算</button>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data(){
			return {
				msg: '提交订单',
				curGiftInfo: this.$storage.getStorage('giftList')[this.$route.params.cur],
				addressLace: require('../../../assets/user/order/top_line.png'),
				iconAddress: require('../../../assets/user/order/address.png'),
				nextIcon: require('../../../assets/common/arrow_right.png')
			}
		},
		components: {
			publicHead
		},
		computed: {
			...mapState(['addressInfo'])
		},
		methods: {
			...mapMutations(['initOrder']),
			toPay(){
				this.$router.push('/confirmPay')
			}
		},
		created(){
			this.initOrder();
		}
	}
</script>

<style scoped>
	.focus {
	    color: #ab1015;
	    font-size: .9rem;
	    line-height: 1.2rem;
	    border: 1px solid #ab1015;
	    border-radius: 4px;
	    padding: 0 0.4rem;
	    margin-left: .6rem;
	    position: relative;
	    top: .3rem;
	}
	.choice-address {
		height: 1.8rem;
	}
	.address {
		font-size: .9rem;
		line-height: 1.8rem;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: top;
		padding: 1.2rem .6rem 1rem .6rem;
	}
	.address .icon-address {
		width: .9rem;
		height: 1.2rem;
	}
	.address .info {
		text-align: left;
	}
	.address .address-info {
		display: inline-block;
		width: 72%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.address .icon-area {
		width:10%;
	}
	.address .info {
		width: 80%;
	}
	.address .icon-footer {
		width: 10%;
		text-align: right;
	}
	.address .icon-footer img {
		width: .6rem;
		position: relative;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.address-area {
		min-height: 100vh;
		background-color: #f2f2f2;
		margin-bottom: 3.5rem;
	}
	.order-area {
		width: 100%;
		max-width: 480px;
		height: 3rem;
		text-align: left;
		font-size: .9rem;
		position: fixed;
	    left: 50%;
	    bottom: 0;
	    -webkit-transform: translateX(-50%);
	    -moz-transform: translateX(-50%);
	    -o-transform: translateX(-50%);
	    transform: translateX(-50%);
	}
	.order-area .total .text-red {
		color: #ab1015;
		font-weight: bold;
	}
	.goods-info {
		margin-top: .5rem;
		padding: .8rem;
	}
	.goods-info .pic {
		width: 5.5rem;
		height: 5.5rem;
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		box-shadow: 0 0 10px #ccc;
		margin-right: .9rem;
	}
	.goods-info img {
		width: 100%;
	}
	.goods-info .info {
		width: 75%;
		text-align: left;
		font-size: .9rem;
		line-height: 1.5rem;
	}
	.total {
		width: 60%;
		padding: .8rem;
	}
	.btn-order {
		width: 40%;
		height: 3rem;
		line-height: 3rem;
		font-size: .9rem;
		color: #fff;
		text-align: center;
		border: none;
		background-color: #ff9c00;
	}
	.no-address {
		width: 90%;
		height: 2.6rem;
		line-height: 2.6rem;
		text-align: center;
		color: #ff9c00;
		font-size: .9rem;
		border: 1px solid #ff9c00;
		border-radius: 20px;
		margin: .6rem auto;
	}
	.no-address span {
		display: inline-block;
		font-size: 1.1rem;
		margin-right: .4rem;
	}
	.flex {
	    display: flex;
	}
	.integral, .deduction-integral {
	    font-size: .9rem;
	    background-color: #fff;
	    margin-top: .5rem;
	    padding: 0 1.3rem;
	}
	.integral-header {
	    height: 3.5rem;
	    line-height: 3.5rem;
	}
	.integral-header span {
	    width: 50%;
	    color: #333333;
	}
	.t-left {
	    text-align: left;
	}
	.t-right {
	    text-align: right;
	}
	em {
	    font-style: normal;
	}
	.integral-enter p {
	    height: 2rem;
	    line-height: 2rem;
	    color: #999999;
	    text-align: left;
	}
	.integral-enter input {
	    width: 100%;
	    height: 2rem;
	    border: 0;
	    border-bottom: 1px solid #ddd;
	    border-radius: 4px;
	    padding-left: .4rem;
	    outline: none;
	}
	.integral-rule {
	    font-size: .8rem;
	    color: #999999;
	    text-align: left;
	    line-height: 1.6rem;
	    margin-top: 1rem;
	    padding-bottom: 2rem;
	    border-bottom: 1px solid #ededed;
	}
	.integral-rule li span {
	    display: inline-block;
	    width: .34rem;
	    height: .34rem;
	    background: url(../../../assets/user/order/point.png) no-repeat;
	    background-size: .34rem .34rem;
	    position: relative;
	    top: -.1rem;
	    margin-right: .4rem;
	}
	.deduction-integral {
	    opacity: 0;
	    height: 3.2rem;
	    line-height: 3.2rem;
	    border-bottom: 1px solid #ededed;
	    -webkit-transition: .8s;
	    transition: .8s;
	    background-color: #fff;
	}
	.half {
	    width: 50%;
	}
	.pay-money {
	    opacity: 0;
	    font-size: .9rem;
	    background-color: #fff;
	    padding: 0 1.3rem;
	    height: 3.2rem;
	    line-height: 3.2rem;
	    border-bottom: 1px solid #ededed;
	    -webkit-transition: .8s;
	    transition: .8s;
	}
</style>