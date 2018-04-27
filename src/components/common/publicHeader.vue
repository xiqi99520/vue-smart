<template>
	<div class="common-header clear">
		<a class="goback" @click="goback"></a>
		<img class="pull-left arrow-left" :src="backIcon" alt="">
		{{ title }}
		<a href="/create" class="right-menu pull-right" v-if="rightMenu">{{ rightMenu }}</a>
	</div>
</template>

<script>
	export default {
		props: {
			title: String,
			rightMenu: String
		},
		data() {
			return {
				backIcon: require('../../assets/common/arrow_left.png')
			}
		},
		methods: {
			goback(){
				this.$router.back();
			}
		}
	}
</script>

<style scoped>
	.goback {
		display: block;
	    width: 2.4rem;
	    height: 2.6rem;
	    position: absolute;
	    left: 0;
	    top: 0;
	    z-index: 9;
	}
	.common-header {
		height: 1rem;
	    line-height: 1rem;
	    text-align: center;
	    padding: .8rem 0;
	    font-size: 1rem;
	    border-bottom: 1px solid #f2f2f2;
	    background-color: #fff;
	}
	.arrow-left {
		width: .5rem;
		position: relative;
		left: .8rem;
	}
	.right-menu {
		width: 3.6rem;
		height: 1.4rem;
		line-height: 1.4rem;
		font-size: .8rem;
		color: #ff9c00;
		border-radius: 20px;
		border: 1px solid #ff9c00;
		position: absolute;
		top: .55rem;
		right: .6rem;

	}
</style>