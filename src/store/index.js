import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        user: {
            name: '测试'
        }
    }
})

export default store