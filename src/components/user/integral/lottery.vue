<template>
	<div class="bg" :style="'backgroundImage:url('+ bg +')'">
		<img class="banner" :src="banner" alt="">
		<p class="draw_point">我的积分 <span>{{ allIntegral }}</span></p>
		<div class="lottery">
			<div class="wrapper" :style="{transform:rotate_angle,transition:rotate_transition_pointer,webkitAnimationIteration:count}">
				<img class="wrapperpic" :src="wrapper" alt="">
				<img class="centerbg" :src="centerBg" alt="">
				<div class="prizes">
					<div v-for="(item,index) in prizeList" :class="['draw_li', 'rotate' + index]">
						<p class="dg_word"><span>{{ item.name }}</span></p>
						<p class="dg_pic"><img :src="item.pic"></p>
						<p class="thisId" style="display: none;">{{ item.id }}</p>
					</div>
				</div>
			</div>
			<img @click="rotate_handle()" class="pointer" :src="pointer" alt="">
		</div>
		<p class="tip">每抽取一次 将消耗20积分</p>
		<div class="btn-group">
			<a class="btn-rule" href="Javascript:void(0)">游戏规则</a>
			<a href="">我的奖品</a>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations  } from 'vuex'
	import Qs from 'qs'
	export default {
		data() {
			return {
				banner: require('../../../assets/user/integral/title.png'),
				bg: require('../../../assets/user/integral/bg.jpg'),
				wrapper: require('../../../assets/user/integral/wrapper.png'),
				pointer: require('../../../assets/user/integral/pointer.png'),
				centerBg: require('../../../assets/user/integral/center_bg.png'),
				prizeList: [
					{ 
						name: '10积分',
						pic: require('../../../assets/user/integral/product5.jpg'),
						id: 3
					},
					{ 
						name: '充电宝5X',
						pic: require('../../../assets/user/integral/product1.jpg'),
						id: 7
					},
					{ 
						name: '智能排插',
						pic: require('../../../assets/user/integral/product2.jpg'),
						id: 10
					},
					{ 
						name: '谢谢参与',
						pic: '',
						id: 11
					},
					{ 
						name: '吸尘器',
						pic: require('../../../assets/user/integral/product3.jpg'),
						id: 12
					},
					{ 
						name: '扫地机器人',
						pic: require('../../../assets/user/integral/product4.jpg'),
						id: 13
					},
				],
				toast_control: false, //抽奖结果弹出框控制器
				hasPrize: false, //是否中奖
				start_rotating_degree: 0, //初始旋转角度
				rotate_angle: 0, //将要旋转的角度
				start_rotating_degree_pointer: 0, //指针初始旋转角度
				rotate_angle_pointer: 0, //指针将要旋转的度数
				rotate_transition: "transform 6s linear", //初始化选中的过度属性控制
				rotate_transition_pointer: "transform 5s linear", //初始化指针过度属性控制
				click_flag: true, //是否可以旋转抽奖
				i: 0, //测试使用,
				idx: 0,
				count: ''
			}
		},
		computed: {
			...mapState(['allIntegral']),
			toast_title() {
		      return this.hasPrize
		        ? "恭喜您，获得" +this.prize_list[this.i].count + ' ' + this.prize_list[this.i].name
		        : "未中奖";
		    },
		    toast_pictrue() {
		      return this.hasPrize
		        ? ''
		        : '';
		    }
		},
		methods: {
			...mapMutations(['GetCookie']),
			startRotate(rotateNum){
				this.rotate_angle = "rotate(360deg)";
				this.count = 'infinite';
			},
		    rotate_handle() {
		    	this.GetCookie('id');
		    	this.startRotate(this.start_rotating_degree - this.start_rotating_degree % 360);
	            let params = {
	                memberId: this.$store.state.cookieVals.id
	            };
	            let curParams = Qs.stringify(params);
	            this.$axios.post('/zzjj-app/goodstake/luckDraw.do', curParams).then(response => {
	            	if(response.data.isSuccess == 0){
	            		[3, 7, 10, 11, 12, 13].filter((item, index) => {
		                    if(item == response.data.entity.id){
		                        this.idx = index;
		                        return true;
		                    }
		                    return false;
		                })
		                this.rotating(this.idx);
		                return;
	            	}
	            })
	            this.i = this.i + 2;
		    },
		    rotating(idx) {
				var that = this;
				if (!this.click_flag) return;
				var during_time = 5; // 默认为1s
				var result_index = idx; // 最终要旋转到哪一块，对应prize_list的下标
				var result_angle = [30, 60, 120, 180, 240, 300]; //最终会旋转到下标的位置所需要的度数
				var rand_circle = 16; // 附加多转几圈，2-3
				this.click_flag = false; // 旋转结束前，不允许再次触发
				// 转动盘子
				var rotate_angle = this.start_rotating_degree + rand_circle * 360 + result_angle[result_index] - this.start_rotating_degree % 360;

				this.start_rotating_degree = rotate_angle;

				this.rotate_angle = "rotate(" + rotate_angle + "deg)";
				
				// 旋转结束后，允许再次触发
				setTimeout(function() {
					that.click_flag = true;
					// that.game_over(this.i);
				}, during_time * 1000 + 1500); // 延时，保证转盘转完
		    },
		    game_over() {
		      this.toast_control = true;
		      /*this.hasPrize = this.prize_list[this.i].name*/
		    },
		    //关闭弹窗
		    close_toast() {
		      this.toast_control = false;
		    }
		  }
	}
</script>

<style scoped>
	.bg {
		width: 100%;
		min-height: 100vh;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		overflow-x: hidden;
	}
	.banner {
		display: block;
		width: 75%;
		margin: auto;
		padding-top: 2.2rem;
	}
	.draw_point {
	    text-align: center;
	    margin-top: .5rem;
	    color: #ab1015;
	    font-size: 1.1rem;
	    font-weight: bold;
	}
	.draw_point span {
		font-size: 1.4rem;
    	vertical-align: top;
	}
	.lottery {
		height: 19rem;
		position: relative;
		margin-top: 1.4rem;
	}
	.lottery .wrapperpic {
		width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	.lottery .pointer {
		width: 5.5rem;
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -65%);
		-moz-transform: translate(-50%, -65%);
		-o-transform: translate(-50%, -65%);
		transform: translate(-50%, -65%);
		z-index: 999;
	}
	.lottery .centerbg {
		width: 88%;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    -webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	.wrapper {
		width: 19rem;
	    height: 19rem;
	    position: absolute;
	    left: 50%;
	    margin-left: -9.5rem;
	}
	.prizes {
	    position: absolute;
	    width: 86%;
	    top: 50%;
	    left: 50%;
	    z-index: 2;
	    height: 92%;
	    -webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	.draw_li {
	    position: absolute;
	    transform-origin: 50% 100%;
	    -ms-transform-origin: 50% 100%;
	    width: 100%;
	    text-align: center;
	    height: 50%;
	}
	.dg_word {
	    color: #ab1015;
	    margin-top: 1.3rem;
	    font-size: .8rem;
	    letter-spacing: 0.1rem;
	}
	.dg_word span {
	    display: inline-block;
	    width: 50%;
	}
	.dg_pic {
	    margin-top: 0.5rem;
	}
	.dg_pic img {
	    width: 2.5rem;
	    height: 2.5rem;
	    object-fit: cover;
	    object-position: center center;
	}
	.rotate1 {
	    transform: rotate(300deg);
	    -ms-transform: rotate(300deg);
	}
	.rotate2 {
	    transform: rotate(240deg);
	    -ms-transform: rotate(240deg);
	}
	.rotate3 {
	    transform: rotate(180deg);
	    -ms-transform: rotate(180deg);
	}
	.rotate4 {
	    transform: rotate(120deg);
	    -ms-transform: rotate(120deg);
	}
	.rotate5 {
	    transform: rotate(60deg);
	    -ms-transform: rotate(60deg);
	}
	.tip {
		color: #666;
		margin-top: .8rem;
	}
	.btn-group {
		margin-top: .8rem;
	}
	.btn-group a {
		display: inline-block;
	    width: 43%;
	   	height: 3rem;
	    line-height: 3rem;
	    font-size: 1rem;
	    font-weight: bold;
	    color: #fff;
	    text-align: center;
	    box-shadow: 0px 3px 3px 1px #fad6b1;
	    background-color: #ff9c00;
	    border-radius: 5rem;
	    letter-spacing: 0.2rem;
	}
</style>