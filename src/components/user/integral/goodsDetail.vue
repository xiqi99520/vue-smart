<template>
	<div class="integral-goods-detail">
		<publicHead :title="msg"></publicHead>
		<div class="detail white">
			<div class="slide-area" :style="'backgroundImage: url('+ goods.imageUrl1 +')'"></div>
			<div class="goods-info">
				<p>{{ goods.goodsName }}</p>
				<p>兑换: <span class="text-red">{{ goods.integral }}积分</span><span class="old-prize">¥{{ goods.price }}</span></p>
				<p>限量: <span class="text-red">{{ goods.totalNumber }}</span>件 剩余<span class="text-red">{{ goods.remainderNumber }}</span>件</p>
			</div>
		</div>
		<div class="instructions white">
			<h5 class="title">兑换说明:</h5>
			<div v-html="goods.illustrate"></div>
			<h5 class="title">商品信息:</h5>
			<div v-html="goods.information"></div>
		</div>
		<div class="graphic-desc white">
			<h5 class="title">图文详情:</h5>
			<div class="pics">
				<img :src="goods.imageUrl1" alt="">
			</div>
		</div>
		<router-link to="/order" class="btn-exchange">立即兑换</router-link>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				msg: '积分商品详情',
				product1: require('../../../assets/user/integral/product1.jpg')
			}
		},
		components: {
			publicHead
		},
		computed: {
			...mapGetters(['goodsListArr']),
			goods(){
				return this.goodsListArr[this.$route.query.cur]
			}
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
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center;
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
		display: block;
		width: 100%;
		max-width: 480px;
		height: 3rem;
		line-height: 3rem;
		font-size: .9rem;
		text-align: center;
		color: #fff;
		background-color: #ff9c00;
		border: none;
		position: fixed;
		left: 50%;
	    bottom: 0;
	    -webkit-transform: translateX(-50%);
	    -moz-transform: translateX(-50%);
	    -o-transform: translateX(-50%);
	    transform: translateX(-50%);
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
	.graphic-desc img {
		width: 100%;
	}
</style>