<template>
	<div>
		<publicHead :title="msg" :backurl="backurl"></publicHead>
		<div class="share-nav">
			<ul class="btn-group clear">
				<li :class="['pull-left','btn',curUrl == 0 ? 'active' : '']">
					<router-link to="/share">共享</router-link>
				</li>
				<li :class="['pull-left','btn',curUrl == 1 ? 'active' : '']">
					<router-link to="/accept">接受</router-link>
				</li>
			</ul>
		</div>
		<div class="cont">
			<router-view></router-view>
		</div>
		<div class="btn-add-share" v-if="!curUrl">
			<router-link to="/addshare">
				<span class="icon-add">+</span><span class="title">新增共享设备</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	import publicHead from '../../common/publicHeader'
	export default {
		data() {
			return {
				msg: '共享设备',
				backurl: '/user'
			}
		},
		components: {
			publicHead
		},
		computed: {
            curUrl: function () {
                switch( this.$route.fullPath ) {
                    case '/share' :
                        return 0;
                        break;
                    default :
                        return 1;
                        break;
                }
            }
        }
	}
</script>
	
<style scoped>
	.share-nav {
		border-bottom: 1px solid #f2f2f2;
	}
	.share-nav .btn-group {
		width: 70%;
		margin: auto;
	}
	.share-nav a {
		display: block;
		width: 100%;
		height: 100%;
	}
	.share-nav .btn {
		width: 50%;
		height: 3rem;
		line-height: 3rem;
	}
	.share-nav .active {
		border-bottom: 1px solid #FF9C00;
	}
	.btn-add-share {
		width: 88%;
		height: 4rem;
		line-height: 4rem;
		font-size: .9rem;
		text-align: center;
		border: 1px dashed #ccc;
		border-radius: 4px;
		background-color: #f5f5f5;
		margin: auto;
		margin-top: 2rem;
	}
	.btn-add-share .icon-add {
		display: inline-block;
		width: 1.6rem;
		font-size: 1.6rem;
	}
	.btn-add-share .title {
		position: relative;
		top: -.23rem;
	}
</style>