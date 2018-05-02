<template>
	<div>
		<publicHead :title="msg" :news="news"></publicHead>
		<ul>
			<li class="clear members" v-for="item in securityList">
				<router-link :to="item.url"></router-link>
				<img class="pull-left family-avatar" :src="item.src" alt="">
				<p class="pull-left title">
					<span>{{ item.name }}</span>
					<span class="relationship">{{ item.relationship }}</span>
				</p>
				<img class="pull-right arrow-right" :src="iconRight" alt="" />
			</li>
		</ul>
		<div class="relationship-group clear">
			<div v-for="item in kindsList" class="pull-left identity">
				<router-link to="/addfamily"></router-link>
				<span>{{ item }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				news: require('../../../assets/user/myfamily/icon_news.png'),
				iconRight: require('../../../assets/common/arrow_right.png'),
				msg: '我的家人',
				securityList: [
					{
						name: '刘力',
						relationship: '你是他的爸爸',
						url: '/',
						src: require('../../../assets/user/myfamily/avatar_first.png')
					},
					{
						name: '刘宇',
						relationship: '你是他的爸爸',
						url: '/',
						src: require('../../../assets/user/myfamily/avatar_second.png')
					}
				],
				kindsList: ['亲爱的','爸爸','妈妈','儿子','女儿','同居密友','其他家人',]
			}
		},
		components: {
			publicHead
		}
	}
</script>
	
<style scoped>
	.members {
		position: relative;
		padding: .6rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.members a {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.members .arrow-right {
		width:.5rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		margin-top: -.5rem;
	}
	.members .title {
		height: 2.4rem;
		font-size: .9rem;
		color: #333;
		position: absolute;
		top: 50%;
		left: 4.6rem;
		margin-top: -1.2rem;
		text-align: left;
	}
	.members .relationship {
		display: block;
		font-size: .7rem;
		color: #999999;
		margin-top: .2rem;
	}
	.members .family-avatar {
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
		position: relative;
		overflow:hidden;
	}
	.relationship-group .identity a {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
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
</style>