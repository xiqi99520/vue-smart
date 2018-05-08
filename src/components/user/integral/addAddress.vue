<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<div class="address" :style="'backgroundImage: url('+ addressLace +')'">
			<div class="no-address hide">
				<img :src="noAddress" alt="">
				<p>暂无地址~</p>
			</div>
			<div class="have-address flex">
				<div class="icon-area">
					<img class="icon-address" :src="iconAddress" alt="">
				</div>
				<div class="info">
					<p class="choice-address"><span class="address-info">收货地址:测试地址</span><span class="focus pull-right">默认</span></p>
					<p class="clear">
						<span class="pull-left">收货人: 老冯</span>
						<span class="pull-right">手机: 138xxxx8888</span>
					</p>
				</div>
				<router-link to="/editAddress" class="icon-footer">
					<img :src="iconEdit" alt="">
				</router-link>
			</div>
		</div>
		<router-link to="/editAddress" class="btn-add">+ 添加地址</router-link>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
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
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		color: #fff;
		background-color: #ff9c00;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.address {
		font-size: .9rem;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: top;
		padding: 1.2rem .6rem 1rem .6rem;
		border-bottom: 1px solid #f2f2f2;
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
</style>