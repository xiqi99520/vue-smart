<template>
	<div class="commonform" v-if="isshow">
		<div class="shade" @click="close"></div>
		<ul class="common-form">
			<li>
				<input ref="name" type="text" placeholder="请输入姓名" />
			</li>
			<li>
				<input ref="phone" type="text" placeholder="请输入联系人手机号" />
			</li>
			<li>
				<input ref="company" type="text" placeholder="请输入公司名称" />
			</li>
			<li>
				<input ref="address" type="text" placeholder="请输入用户地址" />
			</li>
			<li>
				<select ref="product" name="product" id="">
					<option value="1">第一轮产品</option>
					<option value="2">第二轮产品</option>
					<option value="3">第三轮产品</option>
				</select>
			</li>
			<button class="btn-reservation" @click="reservation">预约</button>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		props: {
			isshow: Boolean
		},
		data(){
			return {

			}
		},
		methods: {
			reservation(){
				axios.get('http://localhost/zzjj-app/systemmessage/findById.do?id=6711', {
			    		title:"产品体验官招募",
						username:';老冯',
						phone:'18555556666',
						companyName:'乐居',
						userAddress:'南山区',
						type:1
			  	}).then(function (response) {
				    console.log(response);
				}).catch(function (error) {
				    console.log(error);
				});
			},
			close(){
				this.$emit('close');
			}
		}
	}
</script>

<style scoped>
	.commonform {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1;
	}
	.common-form {
		width: 75%;
		border-radius: 8px;
		background-color: #fff;
		margin: auto;
		margin-top: 4.6rem;
		padding: 1.4rem .8rem 1.8rem .8rem;
	}
	.common-form input {
		width: 95%;
		height: 3rem;
		border: none;
		border-bottom: 1px solid #cbcbc7;
		padding-left: .4rem;
		margin-bottom: .6rem;
	}
	.common-form select {
		width: 95%;
		height: 3rem;
		border: none;
		border-bottom: 1px solid #cbcbc7;
	}
	.btn-reservation {
		width: 95%;
		height: 3rem;
		color: #fff;
		font-size: .9rem;
		text-align: center;
		line-height: 3rem;
		letter-spacing: .3rem;
		border: none;
		border-radius: 6px;
		background-color: #ff9c00;
		margin-top: 1.8rem;
	}
</style>