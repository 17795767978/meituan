<template>
	<div class="contral">
		<transition name="move">	
			<div class="left-icon" v-show="list.count" @click.stop.prevent="reduce">
				<span class="icon-remove_circle_outline icon"></span>
			</div>
		</transition>
		<div class="content" v-show="list.count" :cancel="countSum(this.list.count)">{{list.count}}</div>
		<div class="right-icon">
			<span class="icon-add_circle" @click.stop.prevent="increase" :style="iconPrev"></span>
		</div>
	</div>
</template>


<script>
	import Vue from 'vue'
	export default{
		name:'contral',
		data (){
			return {
				isShow:false,
			}
		},
		props:{
			list:{
				type:Object,
				default (){
					return {}
				}
			}
		},
		methods:{
			reduce (){
				this.list.count --;
			},
			increase (){
				if(!this.list.count){
					Vue.set(this.list,'count',1)
				}else{
					this.list.count ++
				}
			},
			countSum (res){
				if(this.list.count < 1){
					this.list.count = 0
					this.isShow = false
				}
			}
		},
		computed:{
			iconPrev (){
				if(this.count != 0){
					return "margin-left:0rem"
				}else{
					return "margin-left:2rem"
				}	
			}
		}
	}

</script>

<style scoped>
@import url(../../common/css/icon.css);
	.contral{
		width: 4.5rem;
		margin-left:0.5rem;
		display: flex;
	}
	.contral .left-icon span{
		width: 30%;
		font-size: 1.5rem;
		color: #bbb
	}
	.contral .right-icon span{
		font-size: 1.5rem;
		color:#ffd161;
		float: right;
	}
	.contral .content{
		width: 30%;
		margin: 0 0.3rem;
		font-size: 1rem;
		line-height: 1.5rem;
		text-align: center;
	}
	.move-enter-active,.move-leave-active{
		transition: all 0.3s linear;
	}
	.move-enter,.move-leave-to{
		transform: translateX(2.5rem) rotate(180deg);
	}
</style>