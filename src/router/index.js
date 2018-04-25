import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import List from '@/components/equipment/list'
import User from '@/components/user/user'
import First from '@/components/index/childrens/index'
import Home from '@/components/index/childrens/home'
import Bed from '@/components/index/childrens/bed'
import Study from '@/components/index/childrens/study'
import Scene from '@/components/scenes/mainScene'
import sceneGroup from '@/components/scenes/childrens/scene'
import linkage from '@/components/scenes/childrens/linkage'
import Main from '@/components/index/main'
import Security from '@/components/security/security'
import SecuritySetting from '@/components/security/securitySetting'
import Setting from '@/components/user/setting'
import Problem from '@/components/user/problem'
import Opinion from '@/components/user/opinion'

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
						},
						{ 
				        	path: '/home', 
				        	component: Home 
				        },
				        { 
				        	path: '/bed', 
				        	component: Bed 
				        },
				        { 
				        	path: '/study', 
				        	component: Study 
				        }
					]
				},
		        {
					path: '/scene',
					name: 'Scene',
					component: Scene,
					children: [
						{
							path: '/',
							component: sceneGroup
						},
						{
							path: '/linkage',
							component: linkage
						}
					]
				},
		    ]
		},
		{
			path: '/security',
			name: 'Security',
			component: Security
		},
		{
			path: '/securitySetting',
			name: 'securitySetting',
			component: SecuritySetting
		},
		{
			path: '/addEqu',
			name: 'List',
			component: List
		},
		{
			path: '/user',
			name: 'User',
			component: User
		},
		{
			path: '/setting',
			name: 'Setting',
			component: Setting
		},
		{
			path: '/problem',
			name: 'Problem',
			component: Problem
		},
		{
			path: '/opinion',
			name: 'Opinion',
			component: Opinion
		}
	]
})

Router.prototype.back = function () {
  this.isBack = true;
  window.history.go(-1);
}
