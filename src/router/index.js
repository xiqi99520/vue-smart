import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import List from '@/components/equipment/list'
import User from '@/components/user/user'
import First from '@/components/index/childrens/index'
import Home from '@/components/index/childrens/home'
import Bed from '@/components/index/childrens/bed'
import Study from '@/components/index/childrens/study'

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
		        },
		    ]
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
		}
	]
})

Router.prototype.go = function () {
  this.isBack = true;
  window.history.go(-1);
}