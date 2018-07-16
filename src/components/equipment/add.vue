<template>
	<div>
		<publicHead :title="'添加' + equipmentArr.title || msg"></publicHead>
		<div class="host">
			<img :src="equipmentArr.src1" alt="">
		</div>
		<div class="instructions">
			<p v-html="equipmentArr.desc"></p>
		</div>
		<div class="footer">
			<div class="is-agree"><img :src="[ isAgree ? agree : unagree ]" alt="" @click="toggle">已确定上述操作</div>
			<button class="btn-add-equip" :style="'opacity:'+ curOpacity" @click="add">添加设备</button>
		</div>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data(){
			return {
				msg: '添加设备',
				agree: require('../../assets/common/choose.png'),
				unagree: require('../../assets/common/not_choose.png'),
				hostPic: require('../../assets/equipment/homehost@3x.png'),
				isAgree: false
			}
		},
		computed: {
			curOpacity(){
				return this.isAgree ? 1 : .5;
			},
			equipmentArr(){
				return this.$storage.getStorage('equipmentArr')[this.$route.params.cur];
			}
		},
		components: {
			publicHead
		},
		methods: {
			toggle(){
				this.isAgree = !this.isAgree;
			},
			add(){
				if(this.isAgree){
					this.$router.push('addEquip')
				}
			}
		}
	}
</script>

<style scoped>
	.host {
		padding: .9rem 0;
		border-bottom: 1px solid #f2f2f2;
	}
	.instructions {
		padding: 1.4rem;
	}
	.instructions p {
		font-size: .9rem;
		text-align: left;
	}
	.footer {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		padding-bottom: 1.2rem;
	}
	.footer .is-agree {
		font-size: .9rem;
	}
	.footer .is-agree img {
		width: 1.2rem;
		margin-right: .4rem;
		position: relative;
		top: .23rem
	}
	.footer .btn-add-equip {
		width: 92%;
		height: 2.6rem;
		line-height: 2.6rem;
		font-size: 1rem;
		text-align: center;
		color: #fff;
		background-color: #ff9c00;
		border: none;
		border-radius: 6px;
		margin: auto;
		margin-top: 1.2rem;
	}
</style>