<template>
	<div class="linkage-area">
		<div v-for="item in linkageAll" class="linkage clear">
			<div class="title pull-left">{{ item.title }}</div>
			<div :class="['switch','pull-right', item.isOpen ? 'close' : '']" @click="toggle(item,$event)">
				<span></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				linkageAll: [
					{
						title: '空气净化器',
						isOpen: false
					},
					{
						title: '回家',
						isOpen: true
					},
					{
						title: '离家',
						isOpen: true
					},
					{
						title: '电视机',
						isOpen: false
					},
					{
						title: '热水器',
						isOpen: true
					},

				]
			}
		},
		methods: {
			toggle(item, index){
				return item.isOpen = !item.isOpen;
			}
		}
	}
</script>

<style scoped>
	.linkage-area {
		padding-bottom: 3.55rem;
	}
	.linkage {
		height: 2rem;
		line-height: 2rem;
		padding: 1.2rem 0.9rem 1.2rem 1.2rem;
		border-bottom: 1px solid #f5f5f5;
	}
	.linkage .title {
		font-size: 1rem;
	}
	.switch {
		position: relative;
		width: 4rem;
		height: 1.7rem;
		background-color: #abe5d7;
		border-radius: 20px;
		justify-content: center;
		align-items: center;
	}
	.switch span {
		position: absolute;
		display: block;
		width: 1.54rem;
		height: 1.54rem;
		border-radius: 50%;
		top: 50%;
		left: .08rem;
		transform: translate(150%, -50%);
		background-color: #fff;
	}
	.close {
		background-color: #e6e6e6;
	}
	.close span {
		transform: translate(0%, -50%);
	}
</style>