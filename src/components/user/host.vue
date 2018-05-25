<template>
	<div class="host">
		<layer v-if="this.$store.state.isshow" :isStatus="this.$store.state.signInStatusNum" :msg="this.$store.state.signInStatus"></layer>
		<publicHead :title="msg"></publicHead>
		<img class="host-pic" :src="hostPic" alt="">
		<h5>智能主机</h5>
		<div class="equi-info">
			<ul>
				<li class="clear"><span class="pull-left">设备数</span><span class="pull-right">{{ hostNum }}</span></li>
				<li class="clear"><span class="pull-left">MAC地址</span><span class="pull-right">{{ macAddress }}</span></li>
			</ul>
		</div>
		<button class="btn-del" :style="'opacity:'+ curOpacity" @click="delHost">删除主机</button>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	import layer from '../common/layer'
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				hostPic: require('../../assets/user/host.jpg'),
				msg: '主机'
			}
		},
		components: {
			publicHead,
			layer
		},
		computed: {
			...mapState(['macAddress', 'curOpacity']),
			...mapGetters(['hostNum'])
		},
		methods: {
			...mapMutations(['initHost', 'delHost'])
		},
		created(){
			this.initHost();
		}
	}
</script>

<style scoped>
	.host h5 {
		font-size: 1rem;
	}
	.host-pic {
		width: 55%;
		margin: 2rem auto;
	}
	.equi-info ul {
		border-top: 1px solid #e5e9eb;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
	.equi-info li {
		padding: 1.3rem;
		border-bottom: 1px solid #e5e9eb;
	}
	.btn-del {
		width: 94%;
		height: 2.8rem;
		line-height: 2.8rem;
		font-size: 1rem;
		text-align: center;
		color: #fff;
		background-color: #ff9c00;
		border: none;
		border-radius: 4px;
		margin: auto;
	}
</style>