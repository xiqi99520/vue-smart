<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<ul>
			<li class="clear invites" v-for="item in securityList">
				<img class="pull-left family-avatar" :src="item.src" alt="">
				<p class="pull-left title">
					<span>{{ item.name }}</span>
					<span class="data">{{ item.data }}</span>
				</p>
				<div :class="[ 'pull-right', item.isagree ? 'btn-end' : 'btn-agree' ]" v-text=" item.isagree ? '已同意' : '同意' "></div>
			</li>
		</ul>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				iconRight: require('../../../assets/common/arrow_right.png'),
				msg: '家人邀请',
				securityList: [
					{
						name: '小余请求添加你为家人',
						data: '2017-12-30 15:24',
						src: require('../../../assets/user/myfamily/avatar_first.png'),
						isagree: 1
					},
					{
						name: '刘轩请求添加你为家人',
						data: '2017-12-30 15:24',
						src: require('../../../assets/user/myfamily/avatar_second.png'),
						isagree: 0
					}
				]
			}
		},
		components: {
			publicHead
		}
	}
</script>
	
<style scoped>
	.invites {
		position: relative;
		padding: .6rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.invites a {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.invites .arrow-right {
		width:.5rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		margin-top: -.5rem;
	}
	.invites .title {
		height: 2.4rem;
		font-size: .9rem;
		color: #333;
		position: absolute;
		top: 50%;
		left: 4.6rem;
		margin-top: -1.2rem;
		text-align: left;
	}
	.invites .data {
		display: block;
		font-size: .7rem;
		color: #999999;
		margin-top: .2rem;
	}
	.invites .family-avatar {
		width: 3.4rem;
		height: 3.4rem;
		border-radius: 50%;
	}
	.relationship-group {
		margin-top: 1rem;
		padding: 0 .3rem;
	}
	.relationship-group .identity {
		width:  calc(50% - 1rem);
		padding: .5rem;
	}
	.relationship-group .identity span {
		display: block;
		font-size: .8rem;
		color: #333333;
		border: 1px dotted #e3e3e3;
		border-radius: 4px;
		background-color: #f5f5f5;
		padding: 1.2rem 0;
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
	.btn-end {
		width: 4.2rem;
	    height: 2rem;
	    line-height: 2rem;
	    font-size: .9rem;
		color: #999;
	    border-radius: 20px;
		background-color: #fff;
	    position: absolute;
	    right: .6rem;
	    top: 50%;
	    margin-top: -1rem;
	}
</style>