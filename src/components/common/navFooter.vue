<template>
	<div>
		<ul class="common-nav clear">
			<li v-for="item in navInfo" :class="['pull-left',item.title == curname ? 'active' : '']">
				<router-link :to="item.url">
					<img :src="[item.title == curname ? item.active : item.icon]" alt="">
					<p>{{item.title}}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
        	curname: String
        },
		data(){
			return {
				navInfo: [
					{ 
						icon: require('../../assets/index/icon_home.png'), 
						active: require('../../assets/index/active_home.png'), 
						title: '乐家',
						url: '/'
					},
					{ 
						icon: require('../../assets/index/icon_action.png'), 
						active: require('../../assets/index/active_action.png'), 
						title: '场景联动',
						url: '/'
					},
					{ 
						icon: require('../../assets/index/icon_safe.png'), 
						active: require('../../assets/index/active_safe.png'), 
						title: '安防',
						url: '/'
					},
					{ 
						icon: require('../../assets/index/icon_mine.png'), 
						active: require('../../assets/index/active_mine.png'), 
						title: '我的',
						url: '/user'
					}
				]
			}
		}
	}
</script>

<style scoped>
	.common-nav {
	    width: 100%;
	    max-width: 480px;
	    margin: auto;
		position: fixed;
	    bottom: 0;
	    left: 0;
	    right: 0;
		background-color: #fff;
		padding: .6rem 0;
		border-top: 1px solid #f2f2f2;
	}
	.common-nav a {	
		text-decoration: none;
		color: #000;
	}
	.common-nav .active p {
		color: #ff9c00;
	}
	.common-nav li {
		width: 25%;
		font-size: .8rem;
	}
	.common-nav img {
		height: 1.4rem;
	}
</style>