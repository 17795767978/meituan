<template>
	<div class="star">
		<span class="star-item" v-for="(star, index) in stars" :key="index" :class="star"></span>
	</div>
</template>

<script>
	//设置星星总个数
	const LENGTH = 5

	//设置星星状态
	const CLS_ON = "on"
	const CLS_OFF = "off"
	const CLS_HALF = "half"

	export default {
		name:'star',
		props:{
			score:Number
		},
		computed:{
			stars (){
				let result = []
				//4.7分的算法
				let score = Math.floor(this.score * 2) / 2
				//半星
				let halfScore = score % 1  !==0
				//全星
				let scoreAll = Math.floor(score)

				//遍历全星
				for( var i = 0 ; i < scoreAll ; i++){
					result.push(CLS_ON)
				}
				//半星
				if(halfScore){
					result.push(CLS_HALF)
				}
				//补齐星星个数
				while(result.length < LENGTH){
					result.push(CLS_OFF)
				}
				return result
			}
		}
	}
</script>

<style scoped>
	.star{
		font-size:0px;
	}
	.star .star-item{
		width:0.625rem;
		height: 0.625rem;
		background-repeat: no-repeat;
		background-size: 0.625rem 0.625rem;
		display: inline-block;
		margin-right: 0.2rem
	}
	/*三个星星图片*/
	.star .on{
		background-image: url(imgs/star24_on@2x.png);
	}
	.star .half{
		background-image: url(imgs/star24_half@2x.png);
	}
	.star .off{
		background-image: url(imgs/star24_off@2x.png);
	}
	
</style>