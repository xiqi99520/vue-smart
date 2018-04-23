<template>
	<div class="smooth">
		<div class="header clear">
			<div class="icon-back pull-left" @click="routerback" :style="{backgroundImage: 'url(' + iconBack + ')'}"></div>
			{{ title }}
		</div>
		<div class="equipment">
			<ul>
				<li v-for="item in equipmentArr" class="equ-group clear">
					<img class="pull-left icon" :src="item.src" alt="">
					<span class="equ-name">{{ item.title }}</span>
					<img class="pull-right arrow" :src="iconGo" alt="">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				title: '添加设备',
				iconBack: require('../../assets/common/arrow_left.png'),
				iconGo: require('../../assets/common/arrow_right.png'),
				equipmentArr: [
					{ src: require('../../assets/equipment/homehost@2x.png'), title: '智能主机'},
					{ src: require('../../assets/equipment/airpurifier@2x.png'), title: '空气净化器'},
					{ src: require('../../assets/equipment/airer@2x.png'), title: '智能晾衣架'},
					{ src: require('../../assets/equipment/musichost@2x.png'), title: '智能音乐面板'},
					{ src: require('../../assets/equipment/homehost@2x.png'), title: '扫地机器人'},
					{ src: require('../../assets/equipment/switch@2x.png'), title: '灯'},
					{ src: require('../../assets/equipment/socket@2x.png'), title: '插座'},
					{ src: require('../../assets/equipment/camera@2x.png'), title: '摄像机'},
					{ src: require('../../assets/equipment/controlpanel@2x.png'), title: '情景面板'},
					{ src: require('../../assets/equipment/fingerprintcodelock@2x.png'), title: '智能门锁'},
					{ src: require('../../assets/equipment/temperatureandhumiditysensor@2x.png'), title: '温湿度传感器'},
					{ src: require('../../assets/equipment/gasalarm@2x.png'), title: '可燃气体传感器'},
					{ src: require('../../assets/equipment/humanbodyinduction@2x.png'), title: '人体传感器'},
					{ src: require('../../assets/equipment/smokedetector@2x.png'), title: '烟雾传感器'},
					{ src: require('../../assets/equipment/smoke_detector@2x.png'), title: '一氧化碳传感器'},
					{ src: require('../../assets/equipment/acousto_optic_alarm@2x.png'), title: '声光报警器'},
					{ src: require('../../assets/equipment/retractablecurtainmotor@2x.png'), title: '窗帘'},
					{ src: require('../../assets/equipment/magnetometer@2x.png'), title: '门窗磁传感器'},
					{ src: require('../../assets/equipment/waterimmersionalarm@2x.png'), title: '水浸探测器'},
					{ src: require('../../assets/equipment/button@2x.png'), title: '紧急按钮'},
					{ src: require('../../assets/equipment/infraredtransponder@2x.png'), title: '红外转发器'},
					{ src: require('../../assets/equipment/robot@2x.png'), title: '小白机器人'},
					{ src: require('../../assets/equipment/mirror@2x.png'), title: '魔镜'}
				]
			}
		},
		methods: {
			routerback: function () {
				this.$router.go()
			}
		}
	}
</script>

<style scoped>
	.header {
		width: 100%;
		max-width: 480px;
	    position: fixed;
	    top: 0;
	    left: 0;
	    background-color: #fff;
	    z-index: 9;
	}
	.icon-back {
		width: .5rem;
	    height: 1rem;
	    background-size: .5rem 1rem;
		background-repeat: no-repeat;
		position: relative;
    	left: .6rem;
	}
	.equipment {
		position: relative;
		top: 2.6rem;
	}
	.equipment .icon {
		width: 2.2rem;
		position: absolute;
	    left: .4rem;
	    top: 50%;
	    -webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.equipment .arrow {
		width: .5rem;
		position: absolute;
		right: .8rem;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.equipment .equ-group {
		position: relative;
		padding: .4rem .8rem;
	    border-bottom: 1px solid #f2f2f2;
	    font-size: .8rem;
	    line-height: 2.5rem;
	}
	.equipment .equ-name {
		display: inline-block;
	    width: 75%;
	    text-align: left;
	}
	@media(min-width: 480px) {
        .header{
            left: 50%;
            margin-left: -240px;
        }
    }
</style>