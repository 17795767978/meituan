<template>
		<div class="shopcard">
			<div class="shopcard-left">
				<div class="shopcard-icon" :style="changeColor">
					<span class="icon-shopping_cart logo" @click="toggleList"></span>
					<i class="count-all" v-show="changeMe">{{totelCount}}</i>
				</div>
				<div class="shopcard-content">
					<span>另需{{list.shipping_fee_tip}}</span>
				</div>	
			</div>
			<div class="shopcard-right" :style="changeColor">
				<span v-show="!changeMe">{{list.min_price_tip}}</span>
				<span v-show="changeMe" :style="changeColor">合计：¥{{totelPrice}}</span>
			</div>
			<!-- 购物车详情列表 -->
			<div class="shopcard-list" v-show="changeShow">
				<div class="shop-top">
					{{list2.info}}
				</div>
				<div class="shop-title">
					<div class="shop-name">
						<h3>1号口袋</h3>
					</div>
					<div class="shop-img" @click="clearAll">
						<img src="./imgs/ash_bin.png">
						<h3>清空购物车</h3>
					</div>
				</div>
				<div class="shop-main" ref="listCount">
					<ul>
						<li class="shop-content-list" v-for="(list,index) in selectFoods" :key="index">
							<div class="shop-left">
								<p class="shop-left-name">{{list.name}}</p>
								<p class="shop-left-unit" v-show="!list.description">{{list.unit}}</p>
								<p class="shop-left-desc" v-show="list.unit">{{list.description}}</p>
							</div>
							<div class="shop-middle">
								<h3>¥{{list.min_price}}</h3>
							</div>
							<div class="shop-right">
								<app-card-contral :list="list"></app-card-contral>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="contral-close" v-show="changeShow" @click="closeContral"></div>
		</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import CardContral from './CardContral'
	export default {
		name:'shopLand',
		data (){
			return {
				isShow:false,
				fold:true
			}
		},
		components:{
			'app-card-contral':CardContral
		},
		props:{
			list:{
				type: Object,
				default:{}
			},
			list2:[Array,Object],
			selectFoods:{
				type:Array,
				default (){
					return []
				}
			}
		},
		methods:{
			toggleList (){
				if(this.totelCount){
					this.fold = !this.fold
				}
				//滚动
				if(this.totelCount){
					this.$nextTick( () => {
						if(!this.shopScroll){
							this.shopScroll = new BScroll(this.$refs.listCount,{
								click: true
							})
						}else{
							this.shopScroll.refresh()
						}
					})
				}	
			},
			clearAll (){
				this.selectFoods.forEach((list) => {
						list.count = 0
				})
				this.fold = !this.fold
			},
			closeContral (){
				this.fold = !this.fold
			}
		},
		computed:{
			totelCount (){
				let num = 0
				this.selectFoods.forEach((list) => {
					num += list.count
				})
				return num
			},
			totelPrice (){
				let totel = 0
				this.selectFoods.forEach((list) => {
					totel += list.min_price * list.count
				})
				return totel
			},
			changeColor (){
				if(this.selectFoods.length != 0){
					return "background-color:#ffd161;color:#fff"
				}
			},
			changeMe (){
				if(this.selectFoods.length != 0){
					return this.isShow = true
				}else{
					return this.isShow = false
				}	
			},
			changeShow (){
				return !this.fold
			}
		}
	}
</script>

<style scoped>
@import url(../../common/css/icon.css);
	.shopcard{
		width: 100%;
		height: 2.9rem;
		line-height: 2.9rem;
		background-color: #514f4f;
		position: fixed;
		left: 0;
		bottom:0;
		display: flex;
		z-index: 1000
	}
	.font{
		font-style: normal;
		margin-left: 0.3rem
	}
	.shopcard .shopcard-left{
		flex:1;
	}
	.shopcard .shopcard-right{
		flex: 0 0 7rem;
		display: block;
		text-align: center;
	}
	.shopcard .shopcard-left .shopcard-icon{
		width: 3rem;
		height: 3rem;
		background-color: #666;
		border-radius: 50%;
		position: relative;
		left: 1rem;
		top:-1rem;
		text-align: center;
		padding-top:0.5rem;
		box-sizing: border-box;
		z-index: 1000
	}
	.shopcard .shopcard-left .shopcard-icon .logo{
		font-size: 2rem;
	}
	.shopcard .shopcard-left .shopcard-content{
		position: relative;
		left: 4.5rem;
		bottom: 3rem;
		font-size:0.6rem;
		color:#aaa;
		overflow: hidden;
	}
	.shopcard .shopcard-right span{
		font-size: 0.9rem;
		color: #aaa;
		text-align: center;
		font-family: '微软雅黑,宋体'
	}
	.shopcard .shopcard-left .shopcard-icon .count-all{
		width: 1rem;
		height: 1rem;
		line-height: 1rem;
		border-radius: 50%;
		position: absolute;
		bottom: 2.3rem;
		right: 0.2rem;
		background-color: #f00;
		text-align: center;
		color: #fff;
		font-size: 0.2rem
	}
	.shopcard-list{
		width:100%;
		position: absolute;
		left: 0;
		bottom: 2.9rem;
	}
	.shopcard-list .shop-top{
		width: 100%;
		height: 1.8rem;
		line-height: 1.8rem;
		text-align: center;
		background-color: #f3e6c6;
		font-size: 0.6rem;
		color:#646158;
	}
	.shopcard-list .shop-title{
		width: 100%;
		height: 2rem;
		line-height: 2rem;
		background-color: #eee;
		margin-bottom: 0
	}
	.shopcard-list .shop-title .shop-name{
		width: 4rem;
		height: 100%;
		float: left;
		text-align: center;
	}
	.shopcard-list .shop-title .shop-name h3{
		font-size: 0.6rem;
	}
	.shopcard-list .shop-title .shop-img{
		width:6rem;
		float:right;
		position: relative;
	}
	.shopcard-list .shop-title .shop-img img{
		width: 1rem;
		height: 1rem;
		position: absolute;
		top: 50%;
		margin-top:-0.5rem;
	}
	.shopcard-list .shop-title .shop-img h3{
		font-size: 0.5rem;
		display: inline-block;
		margin-left: 1.2rem
	}
	.shopcard-list .shop-main{
		width: 100%;
		max-height: 22rem;
		background-color: #fff;
		position: relative;
		z-index: 1;
		overflow: hidden;
		top: -0.02rem;
	}
	.shopcard-list .shop-main .shop-content-list{
		width: 100%;
		display: flex;
		border-bottom:1px solid #eee;
	}
	.shopcard-list .shop-main .shop-content-list .shop-left{
		width: 70%;
		padding:0  0.5rem;
		overflow: hidden;

	}
	.shopcard-list .shop-main .shop-content-list .shop-left .shop-left-name{
		font-size: 0.8rem;
	}
	.shopcard-list .shop-main .shop-content-list .shop-left .shop-left-unit{
		font-size: 0.5rem;
		margin-top: -1.5rem;
		color: #ccc
	}
	.shopcard-list .shop-main .shop-content-list .shop-left .shop-left-desc{
		display: block;
		height: 1rem;
		font-size: 0.5rem;
		margin-top: -1.5rem;
		color: #ccc;
	}
	.shopcard-list .shop-main .shop-content-list .shop-middle{
		width: 10%;
		float: right;
		text-align: center;
		font-size: 0.5rem;
		margin-top: 0.2rem
	}
	.shopcard-list .shop-main .shop-content-list .shop-right{
		width: 28%;
		float: right;
		line-height: 1.5rem;
		padding: 1rem 0;
		box-sizing: border-box;
	}
	.contral-close{
		width: 100%;
		height: 100%;
		position:fixed;
		background-color:rgba(0,0,0,0.5);
		left: 0;
		top: 0;
		z-index: -1
	}
</style>