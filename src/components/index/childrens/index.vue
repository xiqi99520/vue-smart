<template>
	<div class="equipment">
        <div class="add" @click="addUrl">
            <span class="add-symbol">+</span><span class="add-tip">点击添加设备</span>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return {
				
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
	.equipment {
        padding-left: 4.4rem;
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
</style>