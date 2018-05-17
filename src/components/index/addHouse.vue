<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<p class="tip">选择一个你要创建的房间</p>
		<div class="homes clear">
			<div class="pull-left quarter padding" v-for="item in optional">
				<div class="pic">
					<img :src="item.pic" alt="">
				</div>
				<p>{{ item.name }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data(){
			return {
				msg: '房间添加',
				optional: [
					{name: '客厅', pic: require('../../assets/index/addhouse/living_room.png')},
					{name: '卧室', pic: require('../../assets/index/addhouse/bedroom.png')},
					{name: '儿童房', pic: require('../../assets/index/addhouse/children.png')},
					{name: '书房', pic: require('../../assets/index/addhouse/study.png')},
					{name: '厨房', pic: require('../../assets/index/addhouse/kitchen.png')},
					{name: '卫生间', pic: require('../../assets/index/addhouse/toilet.png')},
				]
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.homes {
		padding: 1.2rem .5rem;
	}
	.homes .padding {
		box-sizing:border-box;  
		-moz-box-sizing:border-box; /* Firefox */  
		-webkit-box-sizing:border-box; /* Safari */ 
		padding: .4rem;
	}
	.homes p {
		font-size: .9rem;
		margin-top: .2rem;
	}
	.tip {
		font-size: .9rem;
		text-align: left;
		background-color: #f7f7f7;
		padding: .9rem;
	}
	.pic {
		background-color: #f7f7f7;
		border: 1px solid #ddd;
		padding: 1.3rem .4rem;
	}
	.pic img {
		height: 1.6rem;
	}
</style>