<template>
	<div>
        <div class="info">
        	<p class="title">{{ basicInfo.title }}</p>
        	<p class="num">{{ basicInfo.num }}个设备</p>
        </div>
        <div class="equipment-group">
        	<div v-for="item in bindingEqu" class="sec flex">
        		<div class="equ-icon" :style="'backgroundImage:url('+ [item.date ? item.picActive : item.pic] +')'"></div>
        		<div class="equ-info">
        			<p>{{ item.name }}</p>
        			<p class='date' v-text="item.date ? item.date+' 开启' : '关闭' "></p>
        		</div>
        	</div>
        </div>
    </div>	
</template>

<script>
	export default {
        props: {
            bindingEqu: Array,
            basicInfo: Object
        }
	}
</script>

<style scoped>
	.m-home {
        padding-left: 4.4rem;
        text-align: left;
    }
    .m-home .info{
        width: calc(100% - 5.9rem);
        position: absolute;
        top: 1rem;
        background: rgba(255,255,255,.9);
        border-radius: 6px;
        padding: .7rem 0 .5rem .8rem;
    }
    .m-home .info p {
    	line-height: 1.5rem;
    	color: #000;
    }
    .m-home .info .num {
    	font-size: .8rem;
    	color: #999999;
    }
    .equipment-group {
    	width: calc(100% - 5.1rem);
    	height: 72%;
    	position: absolute;
    	top: 5.8rem;
		overflow-y: auto;
    }
    .equipment-group .sec {
    	background: rgba(255,255,255,.9);
        border-radius: 6px;
        padding: 1.4rem 0 1.4rem .8rem;
        margin-bottom: .6rem;
    }
    .equ-info p {
    	font-size: .8rem;
    	line-height: 1.3rem;
    }
    .equ-info .date {
    	color: #b1b0b0;
    	position: relative;
    	top: .17rem;
    }
    .equ-icon {
    	width: 3rem;
    	background-repeat: no-repeat;
    	background-size: contain;
    	margin-right: .4rem;
    }
</style>