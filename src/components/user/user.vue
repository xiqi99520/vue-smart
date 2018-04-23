<template>
	<div class="smooth">
		<div class="header">
			{{ title }}
		</div>
		<div class="info-card">
			<img class="photo" :src="userPic" alt="">
			<p class="user-name">刘阳</p>
			<div class="flex item">
				<div class="trisection num">
					<p>18</p>
					<p class="name">设备</p>
				</div>
				<div class="trisection family">
					<p>6</p>
					<p class="name">家人</p>
				</div>
				<div class="trisection integral">
					<p>35</p>
					<p class="name">积分</p>
				</div>
			</div>
		</div>
		<div class="menu-list">
			<ul class="clear">
				<li v-for="item in menuList" class="pull-left trisection sub-menu">
					<img class="menu-icon" :src="item.icon" alt="">
					<p>{{item.title}}</p>
				</li>
			</ul>
		</div>
		<indexnav :curname="curName"></indexnav>
	</div>
</template>

<script>
	import indexnav from '../common/navFooter'
	export default {
		data(){
			return {
				title: '我的',
				userPic: require('../../assets/user/user.png'),
				curName: '我的',
				menuList: [
					{ icon: require('../../assets/user/shared_device.png'), title: '共享设备'},
					{ icon: require('../../assets/user/my_family.png'), title: '我的家人'},
					{ icon: require('../../assets/user/host.png'), title: '主机'},
					{ icon: require('../../assets/user/sign.png'), title: '积分签到'},
					{ icon: require('../../assets/user/supplies.png'), title: '我要营销'},
					{ icon: require('../../assets/user/opinion.png'), title: '乐居商城'},
					{ icon: require('../../assets/user/problem.png'), title: '设置'},
					{ icon: require('../../assets/user/us.png'), title: '房屋管理'},
					{ icon: require('../../assets/user/Set_up.png'), title: '推荐有礼'}
				]
			}
		},
		components: {
			indexnav
		}

	}
</script>

<style scoped>	
	.smooth .header {
		border-bottom: none;
	}
	.info-card {
		width: 84%;
    	margin: auto;
		-webkit-box-shadow: 0 0 5px 3px rgba(100,100,100,0.1);
		box-shadow: 0 0 5px 3px rgba(100,100,100,0.1);
		padding: 1.5rem 0;
		margin-top: .5rem;
	}
	.photo {
		width: 4.4rem;
		margin-bottom: .6rem;
	}
	.user-name {
		margin-bottom: 1.5rem;
	}
	.item {
		width: 74%;
		margin: auto;
	}
	.item .name {
		font-size: .8rem;
		color: #666;
		margin-top: .1rem;
	}
	.menu-list {
		width: 94%;
		margin: auto;
	}
	.sub-menu {
		margin-top: 2.2rem;
	}
	.sub-menu .menu-icon {
		width: 2.2rem;
		height: 2.2rem;
	}
	.sub-menu p {
		font-size: .8rem;
		margin-top: .3rem;
	}
</style>