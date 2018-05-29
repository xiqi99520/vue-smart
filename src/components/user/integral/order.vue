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
		<div class="order-area flex white">
			<div class="total">
				<span class="text-red">合计: {{ curGiftInfo.integral }}积分</span>
			</div>
			<button class="btn-order">去结算</button>
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
			...mapMutations(['initOrder'])
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
		margin-top: .4rem;
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
</style>