<template>
	<div>
		<publicHead :title="msg"></publicHead>
		<div class="cont">
			<h5>盛世乐居（纳斯达克股票代码：SSLJ）</h5>
			<p class="desc">中国智能家装赴美上市第一股，中国互联网智能家装领军企业，首提互联网智能家装理念，旗下业务包含：一站式整体智能家装（硬软装+智能家居）服务、智能家居科技产品服务，基于互联网技术，以家装为入口，安装全房智能家居，建立用户大数据云平台，打造智能家居闭环生态圈，提前布局未来中国智慧家庭核心入口。</p>
			<img :src="first" alt="" />
			<h5>乐居智能</h5>
			<p class="desc">盛世乐居（亚东）智能科技有限公司（简称乐居智能）是盛世乐居旗下全资子公司，是家装智能硬件的重要战略布局，致力于用科技创新产品，用智能提升品质，让家更有温度。</p>
			<img :src="second" alt="" />
			<p class="desc">人性化APP操作页面，简单，直观，易操作</p>
			<p class="desc">多设备联动，一键操控多个设备产品</p>
			<p class="desc">安防、场景个性化设置，随时关注家里动态</p>
			<p class="desc">人机互动，语音控制所有智能设备，家人共享设备模式</p>
			<p class="desc">积分商城，欢乐转盘抽奖奖品兑换</p>
			<img :src="third" alt="" />
			<h5>乐居智能 让你的家更懂你</h5>
			<p class="desc">国防安全级别云平台系统：</p>
			<p class="desc">自主搭建乐云IoT，密钥由公司内部核心技术生成，周期性更换，依据军工级别规则进行加密处理。</p>
			<p class="desc">采用美国国家技术研究所加密规范AES技术算法，确保用户信息安全性，隐私保障机制达高等级。</p>
			<img :src="fourth" alt="" />
			<p class="desc">乐居智能产品及功能直接面对终端用户，以此辐射酒店、房地产商、装饰公司及设计师等，为这类客户提供智能家居服务。对辐射客户所处行业领域需求痛点，及每个直面用户不同的体验感，提供贴合用户体验的个性化方案。</p>
			<img :src="fifth" alt="" />
			<h5>智能家装系统方案</h5>
			<img :src="sixth" alt="" />
			<h5>八大智能家居功能</h5>
			<img :src="seventh" alt="" />
			<h5>七大产品特点</h5>
			<img :src="eighth" alt="" />
			<h5>八大功能</h5>
			<img :src="ninth" alt="" />
			<h5>十大智能生活场景模式</h5>
			<img :src="tenth" alt="" />
			<img :src="eleventh" alt="" />
			<h5>盛世乐居智能家居生态圈</h5>
			<p class="desc">乐居智能立足原创设计与创新技术驱动，将智能家居产品全方位植入家庭生活，实现先进科技跟便捷生活的无缝连接，同时借助家庭用户的高频次使用，形成精准匹配的用户数据、家居家电数据、楼宇房型数据等，从而触发产品的二次及多次开发，并通过整合先进人才与布局金融资本，使得“用户数据+智能家居+消费金融+人才资源”四大系统形成完美闭环，打造盛世乐居智能家居生态圈，实现智能家庭生活的舒适便捷。</p>
			<img :src="twelfth" alt="" />
			<p class="desc">未来的乐居智能，除了在居住空间不断完善安防监控系统，环境调节系统、家庭娱乐系统、厨房语音系统等，重点研发人工智能、健康检测系统等智能科技，建立分享交流平台，搭建社区服务，以人为轴心，构建成盛世乐居智能家居人文大生态。</p>
			<img :src="thirteenth" alt="" />
		</div>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data() {
			return {
				iconRight: require('../../assets/common/arrow_right.png'),
				msg: '关于我们',
				first: require('../../assets/user/about/first.png'),
				second: require('../../assets/user/about/second.png'),
				third: require('../../assets/user/about/third.png'),
				fourth: require('../../assets/user/about/fourth.png'),
				fifth: require('../../assets/user/about/fifth.png'),
				sixth: require('../../assets/user/about/sixth.png'),
				seventh: require('../../assets/user/about/seventh.png'),
				eighth: require('../../assets/user/about/eighth.png'),
				ninth: require('../../assets/user/about/ninth.png'),
				tenth: require('../../assets/user/about/tenth.png'),
				eleventh: require('../../assets/user/about/eleventh.png'),
				twelfth: require('../../assets/user/about/twelfth.png'),
				thirteenth: require('../../assets/user/about/thirteenth.png')
			}
		},
		components: {
			publicHead
		}
	}
</script>

<style scoped>
	.cont img {
		display: block;
		width: 90%;
		margin: 1.4rem auto;
	}
	.cont h5 {
		font-size: 1rem;
		margin: 2.2rem 0 .8rem 0;
	}
	.cont .desc {
		width: 90%;
		font-size: .9rem;
		line-height: 1.4rem;
		text-align: left;
		margin: auto;
	}
</style>