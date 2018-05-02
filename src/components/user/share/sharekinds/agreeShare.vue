<template>
	<div>
		<ul>
			<li class="clear shares" v-for="item in securityList">
				<img class="pull-left family-avatar" :src="item.src" alt="">
				<p class="pull-left title">
					<span>{{ item.name }}</span>
					<span class="data">{{ item.data }}</span>
				</p>
				<div :class="[ 'pull-right','btn-agree']">删除</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				securityList: [
					{
						name: '小李的共享设备',
						data: '2018-05-02',
						src: require('../../../../assets/user/myfamily/avatar_first.png')
					},
					{
						name: '刘宇的共享设备',
						data: '2018-05-02',
						src: require('../../../../assets/user/myfamily/avatar_second.png')
					}
				]
			}
		}
	}
</script>

<style scoped>
	.shares {
		position: relative;
		padding: .6rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.shares a {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.shares .arrow-right {
		width:.5rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		margin-top: -.5rem;
	}
	.shares .title {
		height: 2.4rem;
		font-size: .9rem;
		color: #333;
		position: absolute;
		top: 50%;
		left: 4.6rem;
		margin-top: -1.2rem;
		text-align: left;
	}
	.shares .data {
		display: block;
		font-size: .7rem;
		color: #999999;
		margin-top: .2rem;
	}
	.shares .family-avatar {
		width: 3.4rem;
		height: 3.4rem;
		border-radius: 50%;
	}
	.btn-agree {
		width: 4.2rem;
	    height: 2rem;
	    line-height: 2rem;
	    font-size: .9rem;
	    color: #fff;
	    border-radius: 20px;
	    background-color: #FF9C00;
	    position: absolute;
	    right: .6rem;
	    top: 50%;
	    margin-top: -1rem;
	}
</style>