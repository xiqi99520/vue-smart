<template>
	<div class="header clear">
        <div class="avatar pull-left">
            <img :src="avatarPic" alt="">
        </div>
        <div class="menu-add pull-right" @click="addUrl">
            <img :src="iconAdd" alt="">
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return {
				avatarPic: require('../../assets/index/avatar.png'),
                iconAdd: require('../../assets/index/add.png'),
			}
		},
        methods: {
            addUrl(){
                this.$router.push({path: '/addEqu'});
            }
        }
	}
</script>

<style scoped>
    .header {
        padding: 1rem;
    }
    .avatar img {
        width: 2.5rem;
    }
    .menu-add img {
        width: 1.4rem;
        margin-top: 0.3rem;
    }
</style>