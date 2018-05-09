import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        user: {
            status: 1
        }
    }
})

export default store