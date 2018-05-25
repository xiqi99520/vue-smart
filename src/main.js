import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import storage from './utils/storage'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

router.beforeEach((to, from, next) => {
    if (to.meta.auth) { //是否验证
        if (store.state.user) { //是否登录
            next()
        } else { //未登录则跳转到登录页面
            next('/login')
        }
    } else {
        next()
    }
})
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
Vue.prototype.$axios = axios;
Vue.prototype.$storage = storage;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';