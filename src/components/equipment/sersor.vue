<template>
	<div>
		<publicHead :title="this.$store.state.sersorName" :setting="setting"></publicHead>
		<img class="banner" :src="banner" alt="">
		<div class="equipment-type">
			<p>设备型号: 987b1869e4944218</p>
		</div>
		<ul class="abnormal">
			<li>气体异常: 2018-01-17 10:52:16</li>
			<li>气体异常: 2018-01-17 10:52:16</li>
			<li>气体异常: 2018-01-17 10:52:16</li>
			<li>气体异常: 2018-01-17 10:52:16</li>
			<li>气体异常: 2018-01-17 10:52:16</li>
		</ul>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data(){
			return {
				setting: require('../../assets/common/setting.png')
			}
		},
		components: {
			publicHead
		},
		computed: {
			...mapState(['sersorName']),
			banner(){
				return require('../../assets/equipment/sersor/'+this.$store.state.curShort+'.jpg')
			}
		},
		methods: {
			...mapMutations(['sersorInit'])
		},
		created(){
			let cur = this.$route.query.cur;
			let data = this.$store.state.eqUl[cur];
			this.sersorInit(data);
		}
	}
</script>

<style scoped>
	.banner {
		width: 100%;
	}
	.equipment-type {
		width: 94%;
		margin: auto;
		margin-top: .6rem;
		font-size: .9rem;
		text-align: left;
		color: #444;
		border-bottom: 1px solid #dedede;
		padding-bottom: .6rem;
	}
	.abnormal {
		width: 92%;
		margin: auto;
		font-size: .8rem;
		text-align: left;
	}
	.abnormal li {
		margin-top: .8rem;
	}
</style>