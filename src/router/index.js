import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('@/components/index/Index')), 'Index')
const First = r => require.ensure([], () => r(require('@/components/index/childrens/index')), 'Index')
const Home = r => require.ensure([], () => r(require('@/components/index/childrens/home')), 'Index')
const Bed = r => require.ensure([], () => r(require('@/components/index/childrens/bed')), 'Index')
const Study = r => require.ensure([], () => r(require('@/components/index/childrens/study')), 'Index')
const Main = r => require.ensure([], () => r(require('@/components/index/main')), 'Index')
const Management = r => require.ensure([], () => r(require('@/components/index/management')), 'Index')
const AddHouse = r => require.ensure([], () => r(require('@/components/index/addHouse')), 'Index')

const Scene = r => require.ensure([], () => r(require('@/components/scenes/mainScene')), 'Scene')
const sceneGroup = r => require.ensure([], () => r(require('@/components/scenes/childrens/scene')), 'Scene')
const linkage = r => require.ensure([], () => r(require('@/components/scenes/childrens/linkage')), 'Scene')

const List = r => require.ensure([], () => r(require('@/components/equipment/list')), 'List')
const Add = r => require.ensure([], () => r(require('@/components/equipment/add')), 'List')
const AddEquip = r => require.ensure([], () => r(require('@/components/equipment/addEquip')), 'List')
const Sersor = r => require.ensure([], () => r(require('@/components/equipment/sersor')), 'List')
const Option = r => require.ensure([], () => r(require('@/components/equipment/option')), 'List')

const Security = r => require.ensure([], () => r(require('@/components/security/security')), 'Security')
const SecuritySetting = r => require.ensure([], () => r(require('@/components/security/securitySetting')), 'Security')

const User = r => require.ensure([], () => r(require('@/components/user/user')), 'User')

const Setting = r => require.ensure([], () => r(require('@/components/user/setting/setting')), 'User')
const About = r => require.ensure([], () => r(require('@/components/user/setting/about')), 'User')
const Opinion = r => require.ensure([], () => r(require('@/components/user/setting/opinion')), 'User')
const Password = r => require.ensure([], () => r(require('@/components/user/setting/password')), 'User')
const Problem = r => require.ensure([], () => r(require('@/components/user/setting/problem')), 'User')
const ProblemDetail = r => require.ensure([], () => r(require('@/components/user/setting/problemDetail')), 'User')

const choiceHouse = r => require.ensure([], () => r(require('@/components/user/house/choiceHouse')), 'User')
const houseManage = r => require.ensure([], () => r(require('@/components/user/house/houseManage')), 'User')
const Create = r => require.ensure([], () => r(require('@/components/user/house/create')), 'User')

const Shop = r => require.ensure([], () => r(require('@/components/user/shop')), 'User')

const Myfamily = r => require.ensure([], () => r(require('@/components/user/myfamily/myfamily')), 'User')
const InviteInfo = r => require.ensure([], () => r(require('@/components/user/myfamily/inviteInfo')), 'User')
const Addfamily = r => require.ensure([], () => r(require('@/components/user/myfamily/addfamily')), 'User')

const Share = r => require.ensure([], () => r(require('@/components/user/share/shareList')), 'User')
const ShareTo = r => require.ensure([], () => r(require('@/components/user/share/sharekinds/shareTo')), 'User')
const AgreeShare = r => require.ensure([], () => r(require('@/components/user/share/sharekinds/agreeShare')), 'User')
const Addshare = r => require.ensure([], () => r(require('@/components/user/share/addshare')), 'User')

const Recommend = r => require.ensure([], () => r(require('@/components/user/recommend/recommend')), 'User')
const Rule = r => require.ensure([], () => r(require('@/components/user/recommend/recommendRule')), 'User')
const ProductRecruit = r => require.ensure([], () => r(require('@/components/user/recommend/productRecruit')), 'User')
const RecommendIntegral = r => require.ensure([], () => r(require('@/components/user/recommend/recommendIntegral')), 'User')
const RecommendQrcode = r => require.ensure([], () => r(require('@/components/user/recommend/recommendQrcode')), 'User')

const Host = r => require.ensure([], () => r(require('@/components/user/host')), 'User')

const Integral = r => require.ensure([], () => r(require('@/components/user/integral/integral')), 'User')
const SignInRule = r => require.ensure([], () => r(require('@/components/user/integral/signInRule')), 'User')
const GoodsList = r => require.ensure([], () => r(require('@/components/user/integral/goodsList')), 'User')
const GoodsDetail = r => require.ensure([], () => r(require('@/components/user/integral/goodsDetail')), 'User')
const Order = r => require.ensure([], () => r(require('@/components/user/integral/order')), 'User')
const AddAddress = r => require.ensure([], () => r(require('@/components/user/integral/addAddress')), 'User')
const Schedule = r => require.ensure([], () => r(require('@/components/user/integral/schedule')), 'User')
const EditAddress = r => require.ensure([], () => r(require('@/components/user/integral/editAddress')), 'User')

const Login = r => require.ensure([], () => r(require('@/components/user/login')), 'Login')
const Log = r => require.ensure([], () => r(require('@/components/user/login/login')), 'Login')
const Verificatione = r => require.ensure([], () => r(require('@/components/user/login/verificatione')), 'Login')
const Register = r => require.ensure([], () => r(require('@/components/user/register')), 'Login')

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index,
			children: [
		        {
					path: '/',
					component: Main,
					children: [
						{
							path: '/', 
		        			component: First 
						}, { 
				        	path: '/home', 
				        	component: Home 
				        }, { 
				        	path: '/bed', 
				        	component: Bed 
				        }, { 
				        	path: '/study', 
				        	component: Study 
				        }
					]
				}, {
					path: '/scene',
					name: 'Scene',
					component: Scene,
					children: [
						{
							path: '/',
							component: sceneGroup
						}, {
							path: '/linkage',
							component: linkage
						}
					]
				},
		    ]
		}, {
			path: '/management',
			name: 'Management',
			component: Management
		}, {
			path: '/addHouse',
			name: 'AddHouse',
			component: AddHouse
		}, {
			path: '/security',
			name: 'Security',
			component: Security
		}, {
			path: '/securitySetting',
			name: 'securitySetting',
			component: SecuritySetting
		}, {
			path: '/list',
			name: 'List',
			component: List
		}, {
			path: '/add',
			name: 'Add',
			component: Add
		}, {
			path: '/addEquip',
			name: 'AddEquip',
			component: AddEquip
		}, {
			path: '/sersor',
			name: 'Sersor',
			component: Sersor,
		},  {
			path: '/option',
			name: 'Option',
			component: Option,
		},{
			path: '/user',
			name: 'User',
			component: User,
			meta: {
		        auth: true
		    }
		}, {
			path: '/setting',
			name: 'Setting',
			component: Setting
		}, {
			path: '/problem',
			name: 'Problem',
			component: Problem
		}, {
			path: '/problemDetail/:id',
			name: 'ProblemDetail',
			component: ProblemDetail
		},{
			path: '/opinion',
			name: 'Opinion',
			component: Opinion
		}, {
			path: '/about',
			name: 'About',
			component: About
		}, {
			path: '/password/:id',
			name: 'Password',
			component: Password
		}, {
			path: '/shop',
			name: 'Shop',
			component: Shop
		}, {
			path: '/choiceHouse',
			name: 'choiceHouse',
			component: choiceHouse
		}, {
			path: '/houseManage/:name',
			name: 'houseManage',
			component: houseManage
		}, {
			path: '/create',
			name: 'Create',
			component: Create
		}, {
			path: '/myfamily',
			name: 'Myfamily',
			component: Myfamily
		}, {
			path: '/inviteInfo',
			name: 'InviteInfo',
			component: InviteInfo
		}, {
			path: '/addfamily',
			name: 'Addfamily',
			component: Addfamily
		}, {
			path: '/share',
			name: 'Share',
			component: Share,
			children: [
				{
					path: '/',
					component: ShareTo
				}, {
					path: '/accept',
					component: AgreeShare
				}
			]
		}, {
			path: '/addshare',
			name: 'Addshare',
			component: Addshare
		}, {
			path: '/recommend',
			name: 'Recommend',
			component: Recommend
		}, {
			path: '/rule',
			name: 'Rule',
			component: Rule
		}, {
			path: '/productRecruit',
			name: 'ProductRecruit',
			component: ProductRecruit
		}, {
			path: '/recommendIntegral',
			name: 'RecommendIntegral',
			component: RecommendIntegral
		}, {
			path: '/recommendQrcode',
			name: 'RecommendQrcode',
			component: RecommendQrcode
		}, {
			path: '/host',
			name: 'Host',
			component: Host
		}, {
			path: '/integral',
			name: 'Integral',
			component: Integral
		}, {
			path: '/signInRule',
			name: 'SignInRule',
			component: SignInRule
		}, {
			path: '/goodsList',
			name: 'GoodsList',
			component: GoodsList
		}, {
			path: '/goodsDetail',
			name: 'GoodsDetail',
			component: GoodsDetail
		}, {
			path: '/order',
			name: 'Order',
			component: Order
		}, {
			path: '/addAddress',
			name: 'AddAddress',
			component: AddAddress
		},{
			path: '/editAddress',
			name: 'EditAddress',
			component: EditAddress
		}, {
			path: '/schedule',
			name: 'Schedule',
			component: Schedule
		}, {
			path: '/login',
			name: 'Login',
			component: Login,
			children: [
				{
					path: '/',
					component: Log
				}, {
					path: '/verificatione',
					component: Verificatione
				}
			]
		}, {
			path: '/register',
			name: 'Register',
			component: Register
		}
	]
})

Router.prototype.back = function () {
	this.isBack = true;
	window.history.go(-1);
}