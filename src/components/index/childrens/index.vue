<template>
	<div class="equipment">
        <div v-if="nodata" class="add" @click="addUrl">
            <span class="add-symbol">+</span><span class="add-tip">点击添加设备</span>
        </div>
        <div class="equipment-list">
            <div class="pull-left single" v-for="item in eqUl">
                <div class="area">
                    <router-link to="/" :style="'backgroundImage:url('+ more +')'"></router-link>
                    <img :src="item.status == 0 ? item.offSrc : item.onSrc" alt="">
                    <p class="equipment-name">{{ item.name }}</p>
                    <p class="status">{{ item.des }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
	export default {
		data(){
			return {
				more: require('../../../assets/common/more.png')
			}
		},
        computed: mapState([
            'nodata',
            'eqUl'
        ]),
		methods: {
            ...mapMutations(['getToken', 'getListen', 'getSend', 'getSdkEqMsg']),
            addUrl(){
                this.$router.push('/add');
            }
        },
        created(){
            if(82437){
                if(!this.$store.socketObj){
                    this.getToken();
                }else{
                    console.log(3);
                    this.getListen();
                    this.getSend(); 
                    this.getSdkEqMsg();
                }
            }else{
                $("#no_login_shadow").css("display","block");
            }
        }
	}
</script>

<style scoped>
	.equipment {
        padding-left: 4.4rem;
    }
    .equipment .equipment-list {
        height: 54vh;
        position: relative;
        top: 1.015rem;
        left: -.3rem;
        overflow-y: auto;
    }
    .equipment .add{
        width: calc(100% - 5.1rem);
        height: 6rem;
        line-height: 6rem;
        background: rgba(255,255,255,.9);
        position: absolute;
        top: 1rem;
        border-radius: 6px;
    }
    .equipment .add .add-symbol{
        font-size: 1.5rem;
        margin-right: .4rem;
    }
    .equipment .add .add-tip{
        position: relative;
        top: -.13rem;
    }
    .single {
        width: 46%;
        margin-bottom: .6rem;
        padding: 0 .3rem;
    }
    .single .area {
        font-size: .8rem;
        background: rgba(255,255,255, .9);
        border-radius: 8px;
        padding: 1.2rem 0;
        position: relative;
    }
    .single .area a {
        display: block;
        width: 1.3rem;
        height: 1.3rem;
        position: absolute;
        right: .6rem;
        top: .2rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
    .single .area img {
        height: 2rem;
    }
    .single .equipment-name {
        margin-top: .5rem;
        margin-bottom: .3rem;
    }
    .single .status {
        font-size: .7rem;
        color: #999;
    }
</style>