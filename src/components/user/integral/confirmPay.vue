<template>
	<div>
		<div class="default-layout flex">
			<span class="t-left half">抵扣积分</span>
			<span class="t-right half">0积分</span>
		</div>
		<div class="default-layout flex">
			<span class="t-left half">支付金额</span>
			<span class="t-right half">¥29</span>
		</div>
		<div class="default-layout flex">
			<span class="t-left half">合计积分</span>
			<span class="t-right half">2900积分</span>
		</div>
		<div class="default-layout flex">
			<span class="t-left half">支付方式</span>
			<span class="t-right half">
				<span class="icon-wechat"></span>微信支付
			</span>
		</div>
		<p class="po_bottom">
			<a class="default-button" id="wxpayhref" href="https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx200938223319260062b473b30438988508&amp;package=2719917377&amp;redirect_url=www.lejuzhineng.cn%3a%2f%2fwxpay">确认支付</a>
		</p>
		<div class="shade"></div>
		<div class="model-confirm">
			<h5>支付提示</h5>
			<div class="confirm-title">
				<p>请您在新打开的支付平台页面进行支付，支付完成前请不要关闭该窗口</p>
				<div class="btn-group clear">
					<a class="pull-left">已完成支付</a>
					<a class="pull-right">支付遇到问题</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data(){
			return {
				msg: '提交订单',
			}
		}
	}
</script>

<style scoped>
	.flex {
	    display: flex;
	}
	.default-layout {
	    font-size: .8rem;
	    background-color: #fff;
	    padding: 0 1.3rem;
	    height: 3.2rem;
	    line-height: 3.2rem;
	    border-bottom: 1px solid #ededed;
	}
	.t-left {
	    text-align: left;
	}
	.half {
	    width: 50%;
	}
	.t-right {
	    text-align: right;
	}
	.icon-wechat {
	    display: inline-block;
	    width: 1.4rem;
	    height: 1.4rem;
	    background: url(../../../assets/user/integral/icon_wechat.png) no-repeat;
	    background-size: 1.4rem;
	    position: relative;
	    top: .55rem;
	    right: .5rem;
	}
	.po_bottom {
	    position: fixed;
	    background-color: #fff;
	    width: 100%;
	    bottom: 0;
	    line-height: 3.2rem;
	    max-width: 640px;
	    margin: 0 auto;
	}
	.shade {
	    display: none;
	    width: 100%;
	    height: 100%;
	    background: rgba(0,0,0,.5);
	    position: fixed;
	    left: 0;
	    top: 0;
	    z-index: 99;
	}
	.model-confirm {
	    display: none;
	    width: 80%;
	    height: 34vh;
	    position: fixed;
	    left: 50%;
	    top: 50%;
	    transform: translate(-50%,-70%);
	    background-color: #fff;
	    border: 1px solid #ccc;
	    box-shadow: 1px 1px 1px #ccc;
	    z-index: 109;
	}
	.model-confirm h5 {
	    background-color: #4c5b78;
	    color: #fff;
	    font-size: .9rem;
	    padding: 1rem 1.4rem;
	}
	.confirm-title {
	    padding: 2rem;
	    font-size: .8rem;
	    text-align: justify;
	}
	.btn-group {
	    margin-top: 2.3rem;
	}
	.btn-group a {
	    display: block;
	    width: 45%;
	    height: 2.3rem;
	    line-height: 2.3rem;
	    text-align: center;
	    border: 1px solid #a2a3a5;
	    background-color: #f1f2f7;
	}
	.default-button {
	    display: inline-block;
	    width: 100%;
	    font-size: .9rem;
	    background-color: #ff9c00;
	    text-align: center;
	    color: #fff;
	}
</style>