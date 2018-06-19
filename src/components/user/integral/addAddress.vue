<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<div class="address" :style="'backgroundImage: url('+ addressLace +')'">
			<div class="no-address hide">
				<img :src="noAddress" alt="">
				<p>暂无地址~</p>
			</div>
			<div class="have-address flex" v-for="(item, index) in addressListInfo">
				<div class="icon-area">
					<img class="icon-address" :src="iconAddress" alt="">
				</div>
				<div class="info">
					<p class="choice-address"><span class="address-info">收货地址:{{ item.province + item.city + item.area + item.addressName }}</span><span class="focus pull-right" v-if="item.isDefault == 0">默认</span></p>
					<p class="clear">
						<span class="pull-left">收货人: {{ item.userName }}</span>
						<span class="pull-right">手机: {{ item.phone }}</span>
					</p>
				</div>
				<router-link :to="{path: '/editAddress/' + index + '/' + item.id }" class="icon-footer">
					<img :src="iconEdit" alt="">
				</router-link>
			</div>
		</div>
		<router-link to="/addNewAddress" class="btn-add">+ 添加地址</router-link>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data(){
			return {
				msg: '提交订单',
				addressLace: require('../../../assets/user/order/top_line.png'),
				noAddress: require('../../../assets/user/order/null_address.png'),
				product1: require('../../../assets/user/integral/product1.jpg'),
				iconAddress: require('../../../assets/user/order/address.png'),
				iconEdit: require('../../../assets/user/order/edit.png'),
				nextIcon: require('../../../assets/common/arrow_right.png')
			}
		},
		components: {
			publicHead
		},
		computed: {
			...mapState(['addressListInfo'])
		},
		methods: {
			...mapMutations(['addressList'])
		},
		created(){
			this.addressList();
		}
	}
</script>

<style scoped>
	.no-address {
		position: relative;
		top: 7rem;
	}
	.no-address img {
		width: 7rem;
		margin-bottom: 1rem;
	}
	.no-address p {
		color: #999;
	}
	.btn-add {
		display: block;
		width: 100%;
		max-width: 480px;
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		color: #fff;
		background-color: #ff9c00;
		position: fixed;
		left: 50%;
	    bottom: 0;
	    -webkit-transform: translateX(-50%);
	    -moz-transform: translateX(-50%);
	    -o-transform: translateX(-50%);
	    transform: translateX(-50%);
	}
	.address {
		font-size: .9rem;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: top;
	}
	.address .icon-address {
		width: .9rem;
		height: 1.2rem;
	}
	.address .info {
		text-align: left;
	}
	.address {
		line-height: 1.8rem;
	}
	.address .icon-area {
		width:10%;
	}
	.address .info {
		width: 80%;
	}
	.address .icon-footer {
		display: block;
		width: 10%;
		text-align: right;
	}
	.address .icon-footer img {
		width: 1.2rem;
		position: relative;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.address .address-info {
		display: inline-block;
		width: 72%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.choice-address {
		height: 1.8rem;
	}
	.focus {
	    font-size: .9rem;
	    color: #ab1015;
	    line-height: 1.2rem;
	    border: 1px solid #ab1015;
	    border-radius: 4px;
	    padding: 0 0.4rem;
	    margin-left: .6rem;
	    position: relative;
	    top: .3rem;
	}
	.have-address {
		padding: 1.2rem .6rem 1rem .6rem;
    	border-bottom: 1px solid #f2f2f2;
	}
</style>