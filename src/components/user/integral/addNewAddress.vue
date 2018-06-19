<template>
	<div>
		<layer v-if="this.$store.state.isshow" :isStatus="this.$store.state.signInStatusNum" :msg="this.$store.state.signInStatus"></layer>
		<publicHead :title="msg"></publicHead>
		<div class="address">
			<div class="edit-address flex">
				<div class="title">收货人:</div>
				<div class="is-enter">
					<input ref="username" type="text" placeholder="请输入您的姓名">
				</div>
			</div>
			<div class="edit-address flex">
				<div class="title">联系电话:</div>
				<div class="is-enter">
					<input ref="phonenum" type="text" placeholder="请输入您的联系电话">
				</div>
			</div>
			<div class="edit-address flex">
				<div class="title">省市区:</div>
				<div class="is-enter">
					<v-distpicker ref="cityinfo" :province="select.province" :city="select.city" :area="select.area" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
				</div>
				<img class="more" :src="nextIcon" alt="">
			</div>
			<div class="edit-address flex">
				<div class="title">详细地址:</div>
				<div class="is-enter">
					<input ref="address" type="text" placeholder="详细地址, 如: 街道/门牌号等">
				</div>
			</div>
			<div class="isdefault" @click="toggleChoose">
				<img :src="[isChoose ? notChoose : choose]" alt=""> 设为默认地址
			</div>
		</div>
		<div class="btn-group">
			<div class="btn-save" @click="save">保存</div>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	import layer from '../../common/layer'
	import VDistpicker from 'v-distpicker'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data(){
			return {
				msg: '编辑地址',
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
			VDistpicker,
			layer
		},
		methods: {
			...mapMutations(['addNewAddress']),
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
				let isdefault = this.isChoose ? 1 : 0;
				let province = this.$refs.cityinfo.province;
				let city = this.$refs.cityinfo.city;
				let area = this.$refs.cityinfo.area;
				let address = this.$refs.address.value;
				let username = this.$refs.username.value;
				let phonenum = this.$refs.phonenum.value;
				let dataObj = {province, city, area, address, username, phonenum, isdefault};
				this.addNewAddress(dataObj);
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