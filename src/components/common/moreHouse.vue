<template>
	<div>
        <layer v-if="this.$store.state.isshow" :isStatus="this.$store.state.signInStatusNum" :msg="this.$store.state.signInStatus"></layer>
        <div class="shade"></div>
        <div class="houses">
            <span class="icon-up"></span>
            <ul>
                <p>切换房屋</p>
                <li v-for="item in houseList" ref="houseInfo" :data-id="item.id" :data-uid="item.uid" @click="toggle">
                    <img ref="curImg" :src="item.imgUrl || avatarPic" alt="">
                    <span class="house-name">{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import layer from './layer'
    import { mapState, mapMutations } from 'vuex'
	export default {
		data(){
			return {
				avatarPic: require('../../assets/index/avatar.png'),
                iconAdd: require('../../assets/index/add.png'),
			}
		},
        computed: {
            ...mapState(['houseList'])
        },
        components: {
            layer
        },
        methods: {
            ...mapMutations(['initHouses', 'toggleHouse']),
            toggle() {
                let id = this.$refs.houseInfo[0].dataset.id;
                let curImg = this.$refs.curImg[0].currentSrc;
                this.toggleHouse({id, curImg});
            }
        },
        mounted() {
            this.initHouses();
        }
	}
</script>

<style scoped>
    .shade {
        z-index: 9;
    }
    .houses {
        width: 40vw;
        max-height: 60vh;
        text-align: left;
        background-color: #fff;
        border-radius: 6px;
        position: absolute;
        left: 1rem;
        top: 4.4rem;
        z-index: 99;
        padding: .6rem 0;
    }
    .houses .icon-up {
        display: inline-block;
        width:0; 
        height:0; 
        border-left: 10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:10px solid #fff;
        position: absolute;
        left: 10px;
        top: -10px;
    }
    .houses img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    }
    .houses p {
        font-size: .8rem;
        padding: 0 .6rem;
        margin-bottom: .4rem;
    }
    .houses li {
        position: relative;
        padding: .2rem .6rem;
    }
    .houses li img {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .houses .house-name {
        display: inline-block;
        font-size: .8rem;
        line-height: 2rem;
        vertical-align: top;
        padding-left: 2.5rem;
    
    }
</style>