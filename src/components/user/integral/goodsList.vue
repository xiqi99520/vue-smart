<template>
	<div>
		<layer v-if="this.$store.state.isshow" :isStatus="this.$store.state.signInStatusNum" :msg="this.$store.state.signInStatus"></layer>
		<publicHead :title="msg"></publicHead>
		<router-link to="/schedule" class="btn-search">已兑换商品进度查询</router-link>
		<div class="exchange">
			<div class="gift-list flex">
				<div class="gift" v-for="(item,index) in goodsListArr">
					<div class="pic" :style="'backgroundImage: url('+ item.imageUrl1 +')'"></div>
					<p>{{ item.goodsName }}</p>
					<p class="val">{{ item.integral }}积分</p>
					<router-link :to="{path: '/goodsDetail', query: {cur: index}}">立即兑换</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	import layer from '../../common/layer'
	import { mapMutations, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				msg: '积分商品列表',
				product: require('../../../assets/user/integral/product.jpg'),
			 	product1: require('../../../assets/user/integral/product1.jpg')
			}
		},
		components: {
			publicHead,
			layer
		},
		computed: {
			...mapGetters(['goodsListArr'])
		},
		methods: {
			...mapMutations(['initGoodsList'])
		},
		mounted(){
			this.initGoodsList();
		}
	}
</script>

<style scoped>
	.btn-search {
		display: block;
		width: 86%;
		height: 2.6rem;
		line-height: 2.6rem;
		text-align: center;
		color: #fff;
		background-color: #ff9600;
		border-radius: 8px;
		margin: 1rem auto;
	}
	.exchange {
		padding-bottom: 3rem;
	}
	.exchange .gift-list {
		flex-wrap: wrap;
		padding: 0 .5rem;
	}
	.exchange .gift-list .gift {
		width: calc(49% - 1.94rem);
	    text-align: center;
	    border: 1px solid #f2f2f2;
	    border-radius: 4px;
	    padding: .6rem;
	    margin: 0 .4rem;
    	padding-bottom: 1rem;
    	margin-bottom: .7rem;
	}
	.exchange .gift-list .gift .pic {
		height: 9rem;
		margin-bottom: 1rem;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	.exchange .gift-list .gift p {
		font-size: .8rem;
		line-height: 1.4rem;
	}
	.exchange .gift-list .gift .val {
		color: #ec3a40;
	}
	.exchange .gift-list .gift a {
		display: inline-block;
		width: 80%;
		height: 2.4rem;
		line-height: 2.4rem;
		border-radius: 6px;
		border: 1px solid #ff9600;
		color: #ff9600;
		background-color: #fff;
		margin-top: .5rem;
	}
</style>