import * as types from './mutation-types'

const actions = {
    initGifts(context) {
        context.commit("types.INIT_GIFTS")
    }
}

export default actions