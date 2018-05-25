<template>
	<div>
	    <div>
	    	<ul class="integral-list" v-if="recommendIntegrals.length">
				<li v-for="(item,index) in recommendIntegrals">
	    			<span class="sr_point"></span>
	    			<p class="sr_num">+{{ item.integral }}</p>
	    			<p class="sr_sign">{{ item.mark }}</p>
	    			<p class="sr_date">{{ item.createDate | formatDate }}</p>
	    		</li>
	    	</ul>
	    	<div class="nodata" v-if="!recommendIntegrals.length">
		  		<p class="nodata-pic">
		  			<img :src="nodata" />
		  		</p>
		  		<p class="nodata-desc">
		  			暂无记录~
		  		</p>
		  	</div>
	    </div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	import { formatDate } from '../../../utils/formatDate'
	export default {
		data(){
			return {
				nodata: require('../../../assets/user/recommend/null.png')
			}
		},
		computed: {
			...mapState(['recommendIntegrals'])
		},
		methods: {
			...mapMutations(['initRecommendIntegral'])
		},
		created() {
			this.initRecommendIntegral();
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:ss')
			}
		}
	}
</script>

<style scoped>
	.nodata {
		width: 100%;
		position: absolute;
		top: 50%;
		-webkit-transform: translateY(-90%);
		-moz-transform: translateY(-90%);
		-o-transform: translateY(-90%);
		transform: translateY(-90%);
		text-align: center;
	}
	.nodata img {
		width: 7rem;
	}
	.nodata-desc {
		color: #999;
		margin-top: 1.6rem;
	}
	.integral-list {
		text-align: left;
		margin-top: 2rem;
	}
	.integral-list li {
		width: 88%;
		position: relative;
		border-left: 1px solid #ccc;
		padding-left: .6rem;
		margin: auto;
		padding-bottom: .6rem;
	}
	.integral-list p {
		line-height: 1.8rem;
	}
	.integral-list .sr_point {
		position: absolute;
	    display: inline-block;
	    width: .7rem;
	    height: .7rem;
	    background-color: #ff9c00;
	    border-radius: 50%;
	    left: -.4rem;
	    top: .4rem;
	}
	.integral-list .sr_num {
	    font-size: 1rem;
	    font-weight: bold;
	}
	.integral-list .sr_sign {
	    font-size: .7rem;
	}
	.integral-list .sr_date {
	    font-size: .8rem;
	    color: #999;
	}
</style>