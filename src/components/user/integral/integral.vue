<template>
    <div :class="['blur',isblur ? '' : 'show']">
        <layer v-if="this.$store.state.isshow" :isStatus="this.$store.state.signInStatusNum" :msg="this.$store.state.signInStatus"></layer>
        <div class="integral">
            <h5>您的可用积分</h5>
            <p class="integral-num">{{ allIntegral || 0 }}</p>
            <p class="recording">已经连续签到{{ continueTimes }}天</p>
            <div class="rule">
                <router-link to="/signInRule">规则 &gt;</router-link>
            </div>
        </div>
        <div :class="['sign-in']" :style="'backgroundImage: url('+ signBg +')'">
            <div class="sign-in-cont">
                <ul class="integral-val clear">
                    <li v-for="(item,index) in this.$store.state.signinDays" :class="['pull-left','six-equals',item == 1 ? 'active' : '']">{{ integralArr[index] }}</li>
                </ul>
                <ul class="line">
                    <li class="dot-pos" v-for="(item,index) in this.$store.state.signinDays">
                        <em :class="[item == 1 ? 'active' : '']"></em>
                        <div v-if="item != 1" class="dot" :style="'backgroundImage: url('+ dot +')'"></div>
                    </li>
                </ul>
                <ul class="date clear">
                    <li class="pull-left six-equals" v-for="item in this.$store.state.daysArr">{{item}}</li>
                </ul>
                <div class="btn-group clear">
                    <button :class="['pull-left', !curSignIn ? 'is-sign-in' : '']" @click="startSignIn">签到</button>
                    <button class="pull-right" @click="lottery">抽奖</button>
                </div>
            </div>
        </div>
        <div class="exchange">
            <div class="header">积分兑好礼
                <router-link to="/goodsList" class="more">更多 &gt;</router-link>
            </div>
            <div class="gift-list flex">
                <div class="gift" v-for="(item,index) in goodsList.slice(0,2)">
                    <div class="pic" :style="'backgroundImage: url('+ item.imageUrl1 +')'"></div>
                    <p>{{ item.goodsName }}</p>
                    <p class="val">{{ item.integral }}积分</p>
                    <router-link class="btn-exchange" :to="{path: '/goodsDetail', query: {cur: index}}">立即兑换</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import layer from '../../common/layer'
export default {
    data() {
        return {
            signBg: require('../../../assets/user/integral/sign_bg.png'),
            dot: require('../../../assets/user/integral/dot.png'),
            product: require('../../../assets/user/integral/product.jpg'),
            product1: require('../../../assets/user/integral/product1.jpg')
        }
    },
    methods: {
        ...mapMutations(['initGifts', 'getIntegral', 'signIn', 'initSign']),
        startSignIn() {
            if (this.$store.state.isSignIn) {
                this.signIn();
                this.getIntegral();
                return;
            }
        },
        lottery() {
            this.$router.push('lottery');
        }
    },
    computed: {
        ...mapState(['isblur', 'goodsList', 'continueTimes', 'allIntegral']),
        curSignIn() {
            return this.$store.state.isSignIn;
        },
        integralArr() {
            return this.$store.state.integrals;
        }
    },
    created() {
        this.getIntegral();
        this.initGifts();
    },
    components: {
        layer
    }
}
</script>
<style scoped>
.sign-in {
    width: 100%;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-transition: all 2.8s;
    -moz-transition: all 2.8s;
    -ms-transition: all 2.8s;
    transition: all 2.8s;
}

.sign-in-cont {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.66);
    padding: 2rem 0 3rem 0;
}

.integral {
    background-color: #f4f2f0;
    text-align: center;
    position: relative;
    padding: 2rem 0
}

.integral .rule {
    font-size: .8rem;
    position: absolute;
    top: 2.3rem;
    right: .8rem;
}

.integral .rule a {
    color: #999;
}

.integral h5 {
    font-size: 1.2rem;
    letter-spacing: .1rem;
}

.integral .integral-num {
    font-size: 2.4rem;
    font-weight: bold;
    color: #ff9c00;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.integral .recording {
    font-size: .9rem;
    color: #ff9c00;
    letter-spacing: .1rem;
}

.integral-val {
    width: 93%;
    margin: auto;
}

.integral-val li {
    font-size: 1.2rem;
}

.line {
    width: 94%;
    margin: auto;
    border-top: 1px dashed #000;
    margin-top: 1.2rem;
}

.line .dot-pos {
    display: inline-block;
    width: 16.5%;
    height: .8rem;
    position: relative;
}

.line em {
    display: none;
    width: .75rem;
    height: .75rem;
    background-color: #ff9c00;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: -.5rem;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 9;
}

.line .dot {
    width: .75rem;
    height: .75rem;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    left: 50%;
    top: -.5rem;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
}

.integral-val .active {
    color: #ff9c00;
}

em.active {
    display: block;
}

.date {
    width: 94%;
    margin: auto;
}

.date li {
    font-size: .8rem;
}

.btn-group {
    width: 90%;
    margin: auto;
    margin-top: 3.3rem;
}

.btn-group button {
    width: 47%;
    height: 2.6rem;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    border: none;
    border-radius: 2rem;
    background-color: #ff9c00;
    outline: none;
}

.btn-group button.is-sign-in {
    background-color: #999;
}

.exchange {
    padding-bottom: 3rem;
}

.exchange .header {
    position: relative;
    padding: 1.7rem 0;
}

.exchange .header .more {
    font-size: .8rem;
    color: #999999;
    position: absolute;
    top: 1.9rem;
    right: .8rem;
}

.gift-list {
    padding: 0 .5rem;
}

.gift-list .gift {
    width: 50%;
    text-align: center;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    padding: .6rem;
    margin: 0 .4rem;
    padding-bottom: 1rem;
}

.gift-list .gift .pic {
    height: 9rem;
    margin-bottom: 1rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.gift-list .gift p {
    font-size: .8rem;
    line-height: 1.4rem;
}

.gift-list .gift .val {
    color: #ec3a40;
}

.gift-list .gift .btn-exchange {
    display: inline-block;
    width: 80%;
    height: 2.4rem;
    line-height: 2.4rem;
    border-radius: 6px;
    border: 1px solid #ff9600;
    color: #ff9600;
    background-color: #fff;
    margin-top: .5rem;
}
</style>