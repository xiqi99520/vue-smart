<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<div class="address">
			<div class="edit-address flex">
				<div class="title">收货人:</div>
				<div class="is-enter">
					<input type="text" placeholder="请输入您的姓名" :value="addressListInfo[cur].userName">
				</div>
			</div>
			<div class="edit-address flex">
				<div class="title">联系电话:</div>
				<div class="is-enter">
					<input type="text" placeholder="请输入您的联系电话" :value="addressListInfo[cur].phone">
				</div>
			</div>
			<div class="edit-address flex">
				<div class="title">省市区:</div>
				<div class="is-enter">
					<v-distpicker ref="test" :province="addressListInfo[cur].province || select.province" :city="addressListInfo[cur].city || select.city" :area="addressListInfo[cur].area || select.area" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
				</div>
				<img class="more" :src="nextIcon" alt="">
			</div>
			<div class="edit-address flex">
				<div class="title">详细地址:</div>
				<div class="is-enter">
					<input type="text" placeholder="详细地址, 如: 街道/门牌号等" :value="addressListInfo[cur].addressName">
				</div>
			</div>
			<div class="isdefault" @click="toggleChoose">
				<img :src="[addressListInfo[cur].isdefault ? notChoose : choose]" alt=""> 设为默认地址
			</div>
		</div>
		<div class="btn-group">
			<div class="btn-del" @click="del">删除</div>
			<div class="btn-save" @click="save">保存</div>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	import VDistpicker from 'v-distpicker'
	import { mapState } from 'vuex'
	export default {
		data(){
			return {
				msg: '编辑地址',
				cur: this.$route.params.cur,
				addressListInfo: this.$storage.getStorage('addressListInfo'),
				isChoose: true,
				choose: require('../../../assets/user/integral/choose.png'),
				notChoose: require('../../../assets/user/integral/not_choose.png'),
				nextIcon: require('../../../assets/common/arrow_right.png'),
				select: { province: '省', city: '市', area: '区' }
			}
		},
		components: {
			publicHead,
			VDistpicker
		},
		methods: {
			onChangeProvince(data) {
		      this.select.province = data.value
		    },
			onChangeCity(data) {
		      this.select.city = data.value
		    },
		    onChangeArea(data) {
		      this.select.area = data.value
		    },
		    toggleChoose(){
		    	this.isChoose = !this.isChoose
		    },
			save(){
				
			},
			del(){
				
			}
		}
	}
</script>

<style scoped>
	.edit-address {
		height: 3.5rem;
		line-height: 3.5rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.edit-address .more {
		height: 1.2rem;
	    position: relative;
	    top: 50%;
	    right: 10px;
	    -webkit-transform: translateY(-50%);
	    -moz-transform: translateY(-50%);
	    -o-transform: translateY(-50%);
	    transform: translateY(-50%);
	}
	.edit-address .title {
		width: 23%;
		font-size: .9rem;
		text-align: right;
	}
	.edit-address .is-enter {
		width: 77%;
		text-align: left;
		padding-left: .5rem;
	}
	.edit-address .is-enter input {
		font-size: .9rem;
		width: 90%;
		height: 2rem;
		line-height: 2rem;
		border: none;
		outline: none;
	}
	.btn-group {
		width: 100%;
		max-width: 480px;
		position: fixed;
		left: 50%;
	    bottom: 0;
	    -webkit-transform: translateX(-50%);
	    -moz-transform: translateX(-50%);
	    -o-transform: translateX(-50%);
	    transform: translateX(-50%);
	}
	.btn-save {
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		color: #fff;
		background-color: #ff9c00;
	}
	.btn-del {
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		color: #777;
		background-color: #ddd;
	}
	.isdefault {
		margin-top: 1.6rem;
	}
	.isdefault img {
		width: 1.3rem;
		position: relative;
		top: .3rem;
	}
</style>