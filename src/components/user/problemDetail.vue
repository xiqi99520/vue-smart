<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<div class="detail">
			<h5 v-text="details[cur].title"></h5>
			<p v-text="details[cur].desc"></p>
		</div>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data() {
			return {
				iconRight: require('../../assets/common/arrow_right.png'),
				msg: '常见问题详情',
				cur: this.$route.params.id || 0,
				details: [
					{
						title: '1. 智能乐居APP如何添加新设备?',
						desc: '首先确保产品与手机距离足够近,再打开乐居智家APP. 如果产品为单品, 直接点击右上方"+"按钮, 进入"添加设备"页面, 选择您要连接的设备,在产品详情页面勾选"已确认上述操作",再点击下方"添加设备"按钮, 待刷新出设备后点击进入连接流程. 若产品不为单品, 则首先要在"添加设备"页面, 选择智能主机. 然后在"添加主机"页面进行添加确认, 最后选择要添加的新设备.'
					},
					{
						title: '2. 什么是场景模式?',
						desc: '场景模式可以在"场景联动"中进行设定, 可设置定时开启/关闭智能设备,如插座、灯、窗帘、智能电视等. 灯光全开模式、灯光全关模式为系统固定模式, 不能更改. 可自行添加自己熟悉的场景模式.'
					},
					{
						title: '3. 什么是设备联动?',
						desc: '设备联动可以在"场景联动"中进行设定, 比如, 当把门窗传感器安装在门上, 把智能灯通电. 可以设定启动条件: "如果"门窗传感器打开, 设定执行任务: "就"等打开. 设定好之后保存联动设置. 这样当门打开时, 灯就会自动打开.'
					},
					{
						title: '4. 什么是设备安防?',
						desc: '设备安防可以在安防模块设置定时"外出布防"、"在家布防"、"撤防", 设备安防对应"场景联动"中的外出安防和在家安防.'
					},
					{
						title: '5. 设备离线怎么办?',
						desc: '如果出现"设备离线"提示, 可能因为当前网络环境比较差或者设备断电导致. 如果设备通过WIFI连接, 请尝试以下操作: (1) 设备是否连接电源; (2) 路由器是否连接外网; (3) 尝试断电重启设备; (4) 如果路由器更换密码, 请尝试重置设备.'
					},
					{
						title: '6. 怎样共享设备?',
						desc: '首先在"我的"里面点击"共享设备"图标,然后"共享设备"页面点击按钮"新增共享设备",输入对方账号(手机号), 即可与对方一起享受智能生活.'
					}
				]
			}
		},
		components: {
			publicHead
		},
		mounted(){

		}
	}
</script>

<style scoped>
	.detail {
		margin-top: .8rem;
	}
	.detail h5 {
		text-align: left;
		padding: .8rem .8rem .4rem .8rem;
	}
	.detail p {
		width: 96%;
		font-size: .7rem;
		line-height: 1.3rem;
		text-align: left;
		margin: auto;
	}
</style>