<template>
	<div class="integral-goods-detail">
		<publicHead :title="msg"></publicHead>
		<div class="detail white">
			<div class="slide-area">
				<img :src="product1" alt="">
			</div>
			<div class="goods-info">
				<p>充电宝</p>
				<p>兑换: <span class="text-red">1积分</span><span class="old-prize">¥15.0</span></p>
				<p>限量: <span class="text-red">10000</span>件 剩余<span class="text-red">9602</span>件</p>
			</div>
		</div>
		<div class="instructions white">
			<h5 class="title">兑换说明:</h5>
			<p>1.积分要等于或者大于物品标记的积分才能兑换成功。</p>
			<p>2.如商品已兑完，则不能再继续兑换。</p>
			<p>3.提交兑换信息，请填写详细的收货人信息。</p>
			<p>4.如发现收货的商品有质量问题，请在收货后24小时内联系乐居智能客服。</p>
			<p>商品信息:</p>
			<p>盛世乐居 移动电源2C 10000毫安 移动电源2/大容量充电宝 双USB输出 双向快充 聚合物 高颜值 自带线 适用于平板/手机等</p>
		</div>
		<div class="graphic-desc white">
			<h5 class="title">图文详情:</h5>
			<div class="pics"></div>
		</div>
		<router-link to="/order" class="btn-exchange">立即兑换</router-link>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				msg: '积分商品详情',
				product1: require('../../../assets/user/integral/product1.jpg')
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.integral-goods-detail {
		font-size: .9rem;
		text-align: left;
		background-color: #f2f2f2;
		padding-bottom: 3rem;
	}
	.slide-area {
		height: 16rem;
	}
	.slide-area img {
		width: 100%;
	}
	.detail .goods-info {
		letter-spacing: .06rem;
		padding: .8rem;
	}
	.detail .goods-info {
		line-height: 1.6rem;
	}
	.text-red {
		font-size: 1rem;
	    color: #ab2517;
	    font-weight: bold;
	}
	.instructions,.graphic-desc {
		margin-top: .6rem;
	}
	.instructions {
		line-height: 1.5rem;
		padding: .8rem;
	}
	.instructions .title {
		font-size: 1rem;
		margin-bottom: .2rem;
	}
	.btn-exchange {
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		font-size: .9rem;
		text-align: center;
		color: #fff;
		background-color: #ff9c00;
		border: none;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.old-prize {
		color: #999;
		text-decoration: line-through;
		margin-left: .5rem;
	}
	.graphic-desc {
		padding: .8rem;
	}
	.graphic-desc .title {
		font-size: 1rem;
		margin-bottom: .2rem;
	}
</style>