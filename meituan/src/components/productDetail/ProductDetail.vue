<template>
  <transition name="move-detail">
	<div class="product-detail" v-show="show" ref="productDetail">
	  <div class="detail-wrapper">
		<!-- 详情页上半部分 -->
		<div class="detail-img-all">
			<div class="full-img">
				<div class="img-top">
					<div class="img-left">
						<span class="icon-close close" @click="closeDetial()"></span>
					</div>
					<div class="img-right">
						<img src="./imgs/more.png" class="more" >
						<img src="./imgs/share.png" class="share">
					</div>
				</div>
				<div class="large-img">
					<img :src="list.picture" class="img-res">
				</div>
			</div>
			<div class="detail-content">
				<div class="detail-content-left">
					<span class="name">{{ list.name }}</span>
					<span class="saled">{{ list.month_saled_content }}</span>
					<span class="price">¥{{ list.min_price }}<i class="unit">/{{list.unit}}</i></span>
				</div>
				<div class="detail-content-right">
					<div class="select" @click="selectShow" v-show="!list.count || list.count == 0">
						<span>选规格</span>
					</div>
					<app-card-contral :list="list" v-show="list.count >= 1"></app-card-contral>
				</div>
			</div>
		</div>
		<!-- 详情页评论部分 -->
		<div class="ratings">
			<div class="ratings-top">
				<div class="ratings-top-left" v-if="list.rating">
					<span class="title">{{ list.rating.title }}</span>
					<span class="comment">
						(
							<span class="desc">{{ list.rating.like_ratio_desc }}</span>
							<i class="ratio">{{ list.rating.like_ratio }}</i>
						)
					</span>
				</div>
				<div class="ratings-top-right" v-if="list.rating">
					<span class="snd-title">{{ list.rating.snd_title }}</span>
					<span class="icon-keyboard_arrow_right arrow"></span>
				</div>
			</div>
			<ul v-if="list.rating">
				<li class="ratings-detail" 
					v-for="(item , index) of list.rating.comment_list" 
					:key="index" 
					>
					<div class="detail-list">
						<div class="detail-list-img">
							<img :src="item.user_icon" class="img-res" v-if="item.user_icon">
							<img src="./imgs/anonymity.png" class="img-res" v-if="!item.user_icon">
						</div>
						<div class="detail-list-content">
							<div class="content-top">
								<span class="left">{{item.user_name}}</span>
								<span class="right">{{item.comment_time}}</span>
							</div>
							<div class="content-main">
								<p class="content-main-font">{{item.comment_content}}</p>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	  </div>
	</div>
  </transition>	
</template>

<script>
	import CardContral from '../goods/CardContral'
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	export default{
		name:'product',
		props:{
			list:{
				type: Object,
			}
		},
		components:{
			'app-card-contral':CardContral,
		},
		data (){
			return{
				show:false,
			}
		},
		methods:{
			showView (){
				this.show = true
				//滚动
				this.$nextTick( () => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.productDetail,{
							click: true
						})
					}else{
						this.scroll.refresh()
					}
				})	
			},
			closeDetial (){
				this.show = false
			},
			selectShow (){
				Vue.set(this.list,'count',1)
			}
		},
	}
</script>

<style>
@import url(../../common/css/icon.css);
	.product-detail{
		width: 100%;
		background-color: white;
		position:absolute;
		top: 0;
		left: 0;
		bottom: 2.9rem;
		z-index: 999
	}
	.product-detail .detail-wrapper .detail-img-all{
		width: 100%;
		border-bottom: 0.6rem solid #eee
	}
	.product-detail .detail-wrapper .detail-img-all .full-img .img-top{
		width: 100%;
		height:3rem;
	}
	.product-detail .detail-wrapper .detail-img-all .full-img .img-top .img-left{
		width: 40%;
		height: 100%;
		float:left;
		margin-left: 1rem;
	}
	
	.product-detail  .detail-wrapper .detail-img-all .full-img .img-top .img-left .close{
		width: 2rem;
		height: 2rem;
		display: block;
		background-color: rgba(0,0,0,0.5);
		font-size: 2rem;
		border-radius: 50%;
		margin-top: 0.5rem;
		color: white
	}
	.product-detail .detail-wrapper .detail-img-all .full-img .img-top .img-right{
		width: 25%;
		height: 100%;
		float:right;
	}
	.product-detail .detail-img-all .full-img .img-top .img-right .more{
		width: 2rem;
		height: 2rem;
		background-color: #fff;
		font-size: 2rem;
		border-radius: 50%;
		margin-top: 0.5rem;
		margin-right: 0.5rem;
		color: white
	}
	.product-detail .detail-wrapper .detail-img-all .full-img .img-top .img-right .share{
		width: 2rem;
		height: 2rem;
		background-color: #fff;
		font-size: 2rem;
		border-radius: 50%;
		margin-top: 0.5rem;
		color: white
	}
	.product-detail .detail-wrapper .detail-img-all .full-img .img-top .large-img{
		width: 100%;
		height: 40%;
	}
	.img-res{
		width: 80%;
		display: block;
		margin-left: 10%
	}
	.detail-content{
		width: 100%;
		display: flex;
		flex: 1
	}
	.detail-content-left{
		width: 80%
	}
	.detail-content-left span{
		display: block;
		margin-bottom: 0.5rem;
		padding: 0 1rem;
	}
	.detail-content-left span.name{
		font-size: 1rem;
		font-weight: bold;
	}
	.detail-content-left span.saled{
		font-size:0.5rem;
		color:#ccc;
	}
	.detail-content-left span.price{
		color: red;
	}
	.detail-content-left span.price .unit{
		font-size: 0.7rem;
		color:#ccc;
	}
	.detail-content-right{
		width: 30%;
		padding: 2rem 0;
		position: relative;
	}
	.detail-content-right .select{
		width: 3.4rem;
		height: 2rem;
		line-height: 2rem;
		border-radius: 0.8rem;
		background-color: #FFD161;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left:-1.7rem;
		margin-top:-1rem;
		text-align: center;
	}
	.detail-content-right .select span{
		font-size: 0.5rem;
		font-weight: 900;
	}
	.product-detail .detail-wrapper .ratings{
		width: 100%;
		margin-bottom: 1rem;
	}
	.product-detail .detail-wrapper .ratings .ratings-top{
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		padding: 0  1rem;
		box-sizing: border-box;
		position: relative;
	}
	.product-detail .detail-wrapper .ratings .ratings-top .ratings-top-left{
		float: left
	}
	.product-detail .detail-wrapper .ratings .ratings-top .ratings-top-left .title{
		font-size: 0.8rem
	}
	.product-detail .detail-wrapper .ratings .ratings-top .ratings-top-left .comment{
		font-size: 0.6rem;
		padding: 0  0.3rem;
		box-sizing: border-box;
	}
	.product-detail .ratings .ratings-top .ratings-top-left .comment .ratio{
		color: red
	}
	.product-detail .ratings .ratings-top .ratings-top-right{
		float: right;
		color:#ccc;
	}
	.product-detail .ratings .ratings-top .ratings-top-right .snd-title{
		font-size: 0.8rem;
		margin-right: 0.2rem
	}
	.product-detail .ratings .ratings-top .ratings-top-right .arrow{
		font-size: 0.8rem
	}
	.product-detail .ratings .ratings-detail{
		width: 100%;
		padding: 1rem  1rem;
		box-sizing: border-box;
		border-bottom: 1px solid #ccc
	}
	.product-detail .ratings .ratings-detail .detail-list{
		width:100%;
		display: flex;
		flex: 1
	}
	.product-detail .ratings .ratings-detail .detail-list .detail-list-img{
		flex:0 0 3rem;
		margin-right: 1rem
	} 
	.product-detail .ratings .ratings-detail .detail-list .detail-list-img .img-res{
		width: 100%;
		display: block;
		border-radius: 50%;
	}
	.product-detail .ratings .ratings-detail .detail-list .detail-list-content{
		width: 100%;
		padding: 0.3rem 0;
	}
	.product-detail .ratings .ratings-detail .detail-list .detail-list-content .content-top{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		margin-bottom: 0.2rem
	}
	.product-detail .ratings .ratings-detail .detail-list .detail-list-content .content-top .left{
		font-size: 0.5rem;
		display: block;
		float: left
	}
	.product-detail .ratings .ratings-detail .detail-list .detail-list-content .content-top .right{
		font-size: 0.5rem;
		display: block;
		float: right;
		color: #aaa
	}
	.product-detail .ratings .ratings-detail .detail-list .detail-list-content .content-main{
		width: 100%;
		font-size: 0.8rem;
		font-weight: 900;
	}
	.product-detail .ratings .ratings-detail .detail-list .detail-list-content .content-main .content-main-font{
		font-size: 0.8rem;
		font-weight: 550;
		line-height: 150%
	}
	.move-detail-enter-active,.move-detail-leave-active{
		transition: 1.0s
	}
	.move-detail-enter,.move-detail-leave-to{
		transform: translateX(100%);
	}
</style>