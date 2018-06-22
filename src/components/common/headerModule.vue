<template>
	<div class="header clear">
        <div class="avatar pull-left">
            <img :src="avatarEle || avatarPic" alt="" @click="clickMore">
        </div>
        <div class="menu-add pull-right" @click="addUrl">
            <img :src="iconAdd" alt="">
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
	export default {
		data(){
			return {
				avatarPic: require('../../assets/index/avatar.png'),
                iconAdd: require('../../assets/index/add.png'),
			}
		},
        computed: {
            ...mapState(['avatarEle'])
        },
        methods: {
            addUrl(){
                this.$router.push({path: '/list'});
            },
            clickMore(){
                this.$store.state.isShowToggle = 1;
            }
        }
	}
</script>

<style scoped>
    .header {
        padding: 1rem;
    }
    .avatar {
        position: relative;
        z-index: 99;
    }
    .avatar img {
        width: 2.5rem;
    }
    .menu-add img {
        width: 1.4rem;
        margin-top: 0.3rem;
    }
</style>