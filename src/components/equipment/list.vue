<template>
	<div class="smooth">
		<publicHead :title="msg"></publicHead>
		<div class="equipment">
			<ul>
				<li v-for="(item, index) in equipmentArr" class="equ-group clear" @click="toUrl(index)">
					<img class="pull-left icon" :src="item.src" alt="">
					<span class="equ-name">{{ item.title }}</span>
					<img class="pull-right arrow" :src="iconGo" alt="">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data(){
			return {
				msg: '添加设备',
				iconBack: require('../../assets/common/arrow_left.png'),
				iconGo: require('../../assets/common/arrow_right.png'),
				equipmentArr: [
					{ 
						src: require('../../assets/equipment/homehost@2x.png'), 
						src1: require('../../assets/equipment/homehost@3x.png'), 
						title: '智能主机',
						desc: '1、请将网关连接电源。2、用网线把路由器的LAN口和网关的LAN口相连。3、扫描网关底部贴有的二维码。'
					},
					{ 
						src: require('../../assets/equipment/airpurifier@2x.png'), 
						src1: require('../../assets/equipment/airpurifier@3x.png'), 
						title: '空气净化器',
						desc: '打开净化器开关，长按面板上【自动】按键（约3秒）直至WiFi指示灯闪烁。'
					},
					{ 
						src: require('../../assets/equipment/airer@2x.png'), 
						src1: require('../../assets/equipment/airer@3x.png'), 
						title: '智能晾衣架',
						desc: '打开智能晾衣架，长按面板上【自动】按键（约3秒）直至WiFi指示灯闪烁。'
					},
					{ 
						src: require('../../assets/equipment/musichost@2x.png'), 
						src1: require('../../assets/equipment/musichost@3x.png'), 
						title: '智能音乐面板',
						desc: '请在Pad上打开向往播放器，依次点击右上角“…”“IP设置”，扫描“添加设备”二维码'
					},
					{ 
						src: require('../../assets/equipment/homehost@2x.png'), 
						src1: require('../../assets/equipment/homehost@3x.png'), 
						title: '扫地机器人',
						desc: '打开扫地机器人，长按home按键5秒，两个灯交替闪烁进入配网状态。'
					},
					{ 
						src: require('../../assets/equipment/switch@2x.png'), 
						src1: require('../../assets/equipment/switch@3x.png'), 
						title: '灯',
						desc: '重新入网：<br>在灯通电工作的情况下，揭开开关面板，长按设置键5秒，组网指示灯显示红灯长亮，此时表示灯已经脱离ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/socket@2x.png'), 
						src1: require('../../assets/equipment/socket@3x.png'), 
						title: '插座',
						desc: '重新入网：<br>在智能插座通电工作的情况下，揭开开关面板，长按设置键5秒，组网指示灯显示红灯长亮，此时表示智能插座已经脱离ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/camera@2x.png'), 
						src1: require('../../assets/equipment/camera@3x.png'), 
						title: '摄像机',
						desc: '接通电源后，扫描摄像机底部二维码，输入WiFi账号和密码，点击确定，摄像头上蓝色灯常亮即配网成功。'
					},
					{ 
						src: require('../../assets/equipment/controlpanel@2x.png'), 
						src1: require('../../assets/equipment/controlpanel@3x.png'), 
						title: '情景面板',
						desc: '重新入网：<br>在智能控制面板通电工作的情况下，揭开开关面板，长按设置键5秒，组网指示灯显示红灯长亮，此时表示智能控制面板已经脱离ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/fingerprintcodelock@2x.png'), 
						src1: require('../../assets/equipment/fingerprintcodelock@3x.png'), 
						title: '智能门锁',
						desc: '唤醒触摸屏，输入“3 #”后，输入管理员密码/指纹，屏幕显示“请使用APP搜索”。'
					},
					{ 
						src: require('../../assets/equipment/temperatureandhumiditysensor@2x.png'), 
						src1: require('../../assets/equipment/temperatureandhumiditysensor@3x.png'), 
						title: '温湿度传感器',
						desc: '重新入网：<br>用探针顶温湿度传感器的组网键大约5秒，当指示灯绿灯长亮2秒左右，表示温湿度传感器已恢复出厂设置，退出当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/gasalarm@2x.png'), 
						src1: require('../../assets/equipment/gasalarm@3x.png'), 
						title: '可燃气体传感器',
						desc: '重新入网：<br>用探针顶可燃气体传感器的组网键大约10秒，当指示灯绿灯长亮2秒左右，表示可燃气体传感器已恢复出厂设置，退出当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/humanbodyinduction@2x.png'), 
						src1: require('../../assets/equipment/humanbodyinduction@3x.png'), 
						title: '人体传感器',
						desc: '重新入网：<br>用探针顶人体传感器的组网键大约10秒，当指示灯绿灯长亮2秒左右，表示人体传感器已恢复出厂设置，退出当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/smokedetector@2x.png'), 
						src1: require('../../assets/equipment/smokedetector@3x.png'), 
						title: '烟雾传感器',
						desc: '重新入网：<br>用探针顶烟雾传感器的组网键大约10秒，当指示灯绿灯长亮2秒左右，表示烟雾传感器已恢复出厂设置，退出当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/smoke_detector@2x.png'), 
						src1: require('../../assets/equipment/smoke_detector@3x.png'), 
						title: '一氧化碳传感器',
						desc: '重新入网：<br>用探针顶一氧化碳报警器的组网键大约10秒，当指示灯绿灯长亮2秒左右，表示一氧化碳报警器已恢复出厂设置，退出当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/acousto_optic_alarm@2x.png'), 
						src1: require('../../assets/equipment/acousto_optic_alarm@3x.png'), 
						title: '声光报警器',
						desc: '重新入网：<br>在声光报警器上电工作的情况上，长按声光报警器背面的REAST按键5秒以上，声光报警器蓝灯闪烁一次，蜂鸣器短响一声即可恢复出厂设置，自动脱离当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/retractablecurtainmotor@2x.png'), 
						src1: require('../../assets/equipment/retractablecurtainmotor@3x.png'), 
						title: '窗帘',
						desc: '重新入网：<br>在窗帘开关通电工作的情况下，揭开窗帘开关的面板，长按窗帘开关上的设置键5秒，直到开关的入网指示灯持续亮起，表示窗帘开关已退出当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/magnetometer@2x.png'), 
						src1: require('../../assets/equipment/magnetometer@3x.png'), 
						title: '门窗磁传感器',
						desc: '重新入网：<br>用探针顶门窗磁传感器的组网键大约8秒，当指示灯绿灯长亮2~3秒后再闪一下，表示门窗磁传感器已恢复出厂设置，退出当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/waterimmersionalarm@2x.png'), 
						src1: require('../../assets/equipment/waterimmersionalarm@3x.png'), 
						title: '水浸探测器',
						desc: '重新入网：<br>用探针顶水浸传感器的组网键大约10秒，当指示灯绿灯长亮3秒后再闪一下，表示水浸传感器已恢复出厂设置，退出当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/button@2x.png'), 
						src1: require('../../assets/equipment/button@3x.png'), 
						title: '紧急按钮',
						desc: '重新入网：<br>用探针长按紧急按钮的组网键大约10秒，当指示灯绿灯长亮3秒后再闪一下，表示紧急按钮已恢复出厂设置，退出当前所在的ZigBee网络，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/infraredtransponder@2x.png'), 
						src1: require('../../assets/equipment/infraredtransponder@3x.png'), 
						title: '红外转发器',
						desc: '重新入网：<br>请短按产品背面的reset键，绿灯闪烁，表明智能红外遥控器退网成功，即可重新入网。'
					},
					{ 
						src: require('../../assets/equipment/robot@2x.png'), 
						src1: require('../../assets/equipment/robot@3x.png'), 
						title: '小白机器人',
						desc: '打开小白机器人。'
					},
					{ 
						src: require('../../assets/equipment/mirror@2x.png'), 
						src1: require('../../assets/equipment/mirror@3x.png'), 
						title: '打开魔镜',
						desc: '打开魔镜，扫描镜子上的二维码'
					}
				]
			}
		},
		components: {
			publicHead
		},
		mounted(){
			this.$storage.setStorage('equipmentArr', this.equipmentArr, 1);
		},
		methods: {
			toUrl(e){
				this.$router.push('/add/' + e);
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