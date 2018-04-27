import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('@/components/index/Index')), 'Index')
const First = r => require.ensure([], () => r(require('@/components/index/childrens/index')), 'Index')
const Home = r => require.ensure([], () => r(require('@/components/index/childrens/home')), 'Index')
const Bed = r => require.ensure([], () => r(require('@/components/index/childrens/bed')), 'Index')
const Study = r => require.ensure([], () => r(require('@/components/index/childrens/study')), 'Index')
const Main = r => require.ensure([], () => r(require('@/components/index/main')), 'Index')

const Scene = r => require.ensure([], () => r(require('@/components/scenes/mainScene')), 'Scene')
const sceneGroup = r => require.ensure([], () => r(require('@/components/scenes/childrens/scene')), 'Scene')
const linkage = r => require.ensure([], () => r(require('@/components/scenes/childrens/linkage')), 'Scene')

const List = r => require.ensure([], () => r(require('@/components/equipment/list')), 'List')

const Security = r => require.ensure([], () => r(require('@/components/security/security')), 'Security')
const SecuritySetting = r => require.ensure([], () => r(require('@/components/security/securitySetting')), 'Security')

const User = r => require.ensure([], () => r(require('@/components/user/user')), 'User')
const Setting = r => require.ensure([], () => r(require('@/components/user/setting')), 'User')
const Problem = r => require.ensure([], () => r(require('@/components/user/problem')), 'User')
const ProblemDetail = r => require.ensure([], () => r(require('@/components/user/problemDetail')), 'User')
const Opinion = r => require.ensure([], () => r(require('@/components/user/opinion')), 'User')
const About = r => require.ensure([], () => r(require('@/components/user/about')), 'User')
const Password = r => require.ensure([], () => r(require('@/components/user/password')), 'User')
const Shop = r => require.ensure([], () => r(require('@/components/user/shop')), 'User')
const choiceHouse = r => require.ensure([], () => r(require('@/components/user/choiceHouse')), 'User')
const houseManage = r => require.ensure([], () => r(require('@/components/user/houseManage')), 'User')
const Create = r => require.ensure([], () => r(require('@/components/user/create')), 'User')

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
			path: '/security',
			name: 'Security',
			component: Security
		}, {
			path: '/securitySetting',
			name: 'securitySetting',
			component: SecuritySetting
		}, {
			path: '/addEqu',
			name: 'List',
			component: List
		}, {
			path: '/user',
			name: 'User',
			component: User
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
		}
	]
})

Router.prototype.back = function () {
	this.isBack = true;
	window.history.go(-1);
}
