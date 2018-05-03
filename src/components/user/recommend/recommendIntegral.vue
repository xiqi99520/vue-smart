<template>
	<div>
	    <div>
	    	<ul class="integral-list">
				<li>
	    			<span class="sr_point"></span>
	    			<p class="sr_num">+200</p>
	    			<p class="sr_sign">绑定送积分</p>
	    			<p class="sr_date">2018-02-05 20:30</p>
	    		</li>
	    		<li>
	    			<span class="sr_point"></span>
	    			<p class="sr_num">+200</p>
	    			<p class="sr_sign">绑定送积分</p>
	    			<p class="sr_date">2018-02-05 20:30</p>
	    		</li>
	    		<li>
	    			<span class="sr_point"></span>
	    			<p class="sr_num">+200</p>
	    			<p class="sr_sign">绑定送积分</p>
	    			<p class="sr_date">2018-02-05 20:30</p>
	    		</li>
	    	</ul>

	    	<div class="nodata hide">
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
	export default {
		data(){
			return {
				nodata: require('../../../assets/user/recommend/null.png')
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