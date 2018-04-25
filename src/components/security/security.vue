<template>
	<div class="smooth">
		<div class="safe">
			<div class="top-module">
				<div class="setting clear">
					<router-link to="/securitySetting">
						<img class="pull-right" :src="setImg" alt="">
					</router-link>
				</div>
				<div class="status-area">
					<div class="status" :style="'backgroundImage: url('+ safe +')'">
						<p>已撤防</p>
					</div>
					<div class="ripple"></div>
				</div>
				
				<div class="flex trisection-area">
					<div class="trisection" v-for="item in menuList">
						<img :src="item.pic" alt="">
						<p class="title">{{ item.title }}</p>
					</div>
				</div>
			</div>
			
			<div class="category">
				<h5>摄像机</h5>
				<ul class="area">
					<li class="equipment flex">
						<div class="icon" :style="'backgroundImage: url('+ camera +')'"></div>
						<div class="desc">
							<p>摄像机</p>
							<p class="pos">客厅</p>
						</div>
						<div class="data pull-right">今天08:20打开</div>
					</li>
				</ul>
			</div>
			<div class="category">
				<h5>门锁</h5>
				<ul class="area">
					<li class="equipment flex">
						<div class="icon" :style="'backgroundImage: url('+ camera +')'"></div>
						<div class="desc">
							<p>门锁</p>
							<p class="pos">客厅</p>
						</div>
						<div class="data pull-right">今天08:20打开</div>
					</li>
					<li class="equipment flex">
						<div class="icon" :style="'backgroundImage: url('+ camera +')'"></div>
						<div class="desc">
							<p>门锁</p>
							<p class="pos">客厅</p>
						</div>
						<div class="data pull-right">今天08:20打开</div>
					</li>
				</ul>
			</div>
		</div>
		<indexnav :curname="curName"></indexnav>
	</div>
</template>

<script>
	import indexnav from '../common/navFooter'
	export default {
		data() {
			return {
				camera: require('../../assets/security/camera.png'),
				setImg: require('../../assets/security/setting.png'),
				safe: require('../../assets/security/protection.png'),
				unsafe: require('../../assets/security/removal.png'),
				curName: '安防',
				menuList: [
					{
						pic: require('../../assets/security/out_protection_btn_nor.png'),
						picActive: require('../../assets/security/out_protection_btn_pre.png'),
						title: '外出布防'
					},
					{
						pic: require('../../assets/security/home_protection_btn_nor.png'),
						picActive: require('../../assets/security/home_protection_btn_pre.png'),
						title: '在家布防'
					},
					{
						pic: require('../../assets/security/removal_btn_nor.png'),
						picActive: require('../../assets/security/removal_btn_pre.png'),
						title: '撤防'
					}
				]
			}
		},
		components: {
			indexnav
		}
	}
</script>

<style scoped>
	.top-module {
		border-bottom: 1px solid #f2f2f2;
	}
	.status {
		width: 10rem;
		height: 10rem;
		position: relative;
		left: 50%;
		margin-left: -5rem;
		background-repeat: no-repeat;
		background-size: cover;
		margin-top: 2rem;
		margin-bottom: 4rem;
		z-index: 9;
	}
	.status p {
		font-size: .9rem;
		color: #fff;
		position: relative;
		top: 6.4rem;
	}
	.setting {
		padding: 1rem;
	}
	.setting img {
		width: 1.3rem;
	}
	.trisection-area {
		width:90%;
		margin: auto;
		margin-bottom: 2rem;
	}
	.trisection img {
		width: 3.8rem;
	}
	.trisection .title {
		font-size: .7rem;
		margin-top: .1rem;
	}
	.category h5 {
		height: 2.6rem;
		line-height: 2.6rem;
		text-align: left;
		padding-left: 1.2rem;
		background-color: #f7f7f7;
	}
	.category .icon {
		width: 1.7rem;
		margin-right: .8rem;
		background-repeat: no-repeat;
		background-size: contain;
	}
	.category .equipment {
		padding: 1.4rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.category .desc {
		width: 60%;
		font-size: .7rem;
		text-align: left;
	}
	.category .desc p {
		margin-bottom: .1rem;
	}
	.category .desc .pos {
		color: #999;
	}
	.category .data {
		width: 34%;
		color: #999;
		font-size: .7rem;
		text-align: right;
		padding-top: 1.15rem;
	}
	.category .area {
		border-top: 1px solid #f2f2f2;
	}
	.status-area {
		position: relative;
	}
	.ripple {
		width: 10rem;
		height: 10rem;
		background-color: #FFBB4D;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
		animation: ripple 2s ease infinite;
	}
	@keyframes ripple{
		0% {
			opacity: 1;
			-webkit-transform: translateX(-50%);
			-moz-transform: translateX(-50%);
			-o-transform: translateX(-50%);
			transform: translateX(-50%);
		}
		100% {
			opacity: 0;
			-webkit-transform: translateX(-50%) scale(1.6);
			-moz-transform: translateX(-50%) scale(1.6);
			-o-transform: translateX(-50%) scale(1.6);
			transform: translateX(-50%) scale(1.6);
		}
	}
</style>