<template>
	<div class="attributes">
        <div class="basic flex">
            <div class="weather">
                <span>16</span>℃
            </div>
            <div class="city">
                <p>深圳市.南山区</p>
                <p>多云</p>
            </div>
        </div>
        <div class="temperature flex">
            <div>室内温度 24℃</div>
            <span></span>
            <div>室内湿度 60%</div>
            <span></span>
            <div>室内PM 40</div>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped>
    .temperature {
        font-size: .9rem;
    }
    .temperature span {
        display: inline-block;
        border-left: 1px solid #fff;
        margin: 0 .8rem;
    }
	.weather {
        position: relative;
        top: -.8rem;
    }
    .weather span {
        font-size: 4rem;
    }
	.attributes {
        color: #fff;
        padding: 0 1rem;
    }
    .attributes .basic {
        height: 3.8rem;
    }
    .attributes .city {
        text-align: left;
        margin-left: .8rem;
    }
    .attributes .city p {
        font-size: .9rem;
        line-height: 1.6rem;
    }
</style>