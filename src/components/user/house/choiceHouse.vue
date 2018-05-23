<template>
	<div>
		<publicHead :title="msg" :rightMenu="rightMenu" :toUrl="create"></publicHead>
		<ul>
			<li class="clear choice" v-for="(item,index) in houseManagerList">
				<router-link :to="{path: '/houseManage/'+ index }"></router-link>
				<img class="pull-left house-avatar" :src="[item.imgUrl ? item.imgUrl : defaultPic]" alt="房屋头像">
				<p class="pull-left title">{{ item.name }}{{ item.isDefault == 0 ? '(默认)' : '' }}</p>
				<img class="pull-right arrow-right" :src="iconRight" alt="" />
			</li>
		</ul>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	import { mapMutations, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				iconRight: require('../../../assets/common/arrow_right.png'),
				defaultPic: require('../../../assets/index/avatar.png'),
				msg: '选择房屋',
				rightMenu: '创建',
				create: '/create'
			}
		},
		components: {
			publicHead
		},
		methods: {
			...mapMutations(['initHouseList'])
		},
		computed: {
			...mapGetters(['houseManagerList'])
		},
		mounted(){
			this.initHouseList();
		}
	}
</script>

<style scoped>
	.choice {
		position: relative;
		padding: .6rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.choice a {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.choice .arrow-right {
		width:.5rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		margin-top: -.5rem;
	}
	.choice .title {
		height: 2.4rem;
		line-height: 2.4rem;
		font-size: .9rem;
		margin-left: 1rem;
	}
	.choice .house-avatar {
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 50%;
	}
</style>