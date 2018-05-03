<template>
	<div>
		<div class="recruit" @click="layer">
			<img :src="experience" alt="">
		</div>
		<commonForm :isshow="isshow" @close="layer"></commonForm>
	</div>
</template>

<script>
	import commonForm from '../../common/commonForm'
	export default {
		data() {
			return {
				isshow: false,
				experience: require('../../../assets/user/recommend/experience.jpg')
			}
		},
		methods: {
			layer(){
				this.isshow = !this.isshow;
			}
		},
		components: {
			commonForm
		}
	}
</script>

<style scoped>
	.recruit img {
		width: 100%;
	}
</style>