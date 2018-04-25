<template>
	<div class="common-header clear">
		<a class="goback" @click="goback"></a>
		<img class="pull-left arrow-left" :src="backIcon" alt="">
		{{ title }}
	</div>
</template>

<script>
	export default {
		props: {
			title: String
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
</style>