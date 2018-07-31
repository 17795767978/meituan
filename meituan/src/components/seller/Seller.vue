<template>
  <div class="seller" ref="sellerWrapper">
  	<div class="seller-wrapper">
  		<div class="seller-address">
  			<div class="seller-address-top">
  				<div class="left">
  					<img src="./imgs/address.png" class="img-res">
  					<span>{{sellerdata.address}}</span>
  				</div>
  				<div class="right">
  					<img src="./imgs/phone.png" class="img-res">
  				</div>
  			</div>
  			<div class="seller-address-pics" ref="picsAll">
  				<ul class="pics-list" v-if="sellerdata.poi_env" ref="picList">
  					<li class="pics-item" v-for="(picUrl, index) in sellerdata.poi_env.thumbnails_url_list" :key="index" ref='picItem'>
  						<img :src="picUrl" class="img-res">
  					</li>
  				</ul>
  			</div>
  			<div class="seller-address-safe">
  				<div class="left">
  					<img src="./imgs/safety.png" class="img-res">
  					<span>查看商品安全档案</span>
  				</div>
  				<div class="right">
  					<span class="icon-keyboard_arrow_right"></span>
  				</div>
  			</div>
  		</div>
  		<div class="seller-service">
  			<img src="./imgs/delivery.png" class="img-res" />
  			<span>配送服务：{{sellerdata.app_delivery_tip}}</span>
  		</div>
  		<div class="seller-time">
  			<img src="./imgs/time.png" class="img-res" />
  			<span>配送时间：{{sellerdata.shipping_time}}</span>
  		</div>
  		<div class="seller-end-service" v-if="sellerdata.poi_service">
  			<img src="./imgs/server.png" class="img-res" />
  			<span>商家服务</span>
  			<img :src="sellerdata.poi_service[0].icon" class="img-res" />
  			<span>{{sellerdata.poi_service[0].content}}</span>
  		</div>
  		<div class="new-users" v-if="sellerdata.discounts2">
  			<img :src="sellerdata.discounts2[0].icon_url" class="img-res" />
  			<span>{{sellerdata.discounts2[0].info}}</span>
  		</div>
  	</div>
  </div>
</template>

<script>
	import axios from 'axios'
	import BSscroll from 'better-scroll'
	export default {
	  name: 'seller',
	  data () {
	    return {
	      sellerdata:{}
	    }
	  },
	  methods:{
	  	getInfo (){
	  		axios.get("/static/data/seller.json").then(this.getInfoSuc)
	  	},
	  	getInfoSuc (res){
	  		res = res.data
	  		if(res.data){
	  			this.sellerdata = res.data
	  		}
	  		this.$nextTick( () => {
	  			if(!this.scroll){
	  				this.scroll = new BSscroll(this.$refs.sellerWrapper,{
	  					click:true
	  				})
	  			}
	  			let imgW = this.$refs.picItem[0].clientWidth
	  			let imgAll = 11
	  			let width = (imgW + imgAll) * this.sellerdata.poi_env.thumbnails_url_list.length
	  			this.$refs.picList.style.width = width + 'px'
	  			this.scrollWidth = new BSscroll(this.$refs.picsAll,{
	  				scrollX:true
	  			})
	  		})
	  	}
	  },
	  created (){
	  	this.getInfo()
	  }
	}
</script>


<style scoped>
@import url(../../common/css/icon.css);
	.seller{
		width: 100%;
		overflow:hidden;
		position: absolute;
		left: 0;
		top:12.4rem;
		bottom: 0
	}
	.seller .seller-wrapper .seller-address{
		width: 100%;
		border-top:0.5rem solid #eee;
	}
	.seller .seller-wrapper .seller-address .seller-address-top{
		width: 100%;
		padding: 1rem 0.5rem;
		line-height: 1rem;
		box-sizing: border-box;
		display: flex;
	}
	.seller .seller-wrapper .seller-address .seller-address-top .left{
		width: 100%;
		box-sizing: border-box;

	}
	.seller .seller-wrapper .seller-address .seller-address-top .left .img-res{
		width:0.8rem;
		height: 1rem;
		display:block;
		float: left
	}
	.seller .seller-wrapper .seller-address .seller-address-top .left span{
		font-size: 0.8rem;
		font-weight: 550;
		display:block;
		margin-left:1.5rem;
		letter-spacing: 1px
	}
	.seller .seller-wrapper .seller-address .seller-address-top .right{
		flex: 0 0 3rem;
		box-sizing: border-box;
		border-left: 2px solid #eee
	}
	.seller .seller-wrapper .seller-address .seller-address-top .right .img-res{
		width:0.8rem;
		height: 1rem;
		display:block;
		margin-left:1.1rem;
	}
	.seller .seller-wrapper .seller-address .seller-address-pics{
		padding: 0.5rem 0 0.5rem 0.5rem;
		border-top:1px solid #eee;
		border-bottom: 1px solid #eee;
		white-space: nowrap;
		overflow-x:hidden; 
	}
	.seller .seller-wrapper .seller-address .seller-address-pics .pics-list{
	}
	.seller .seller-wrapper .seller-address .seller-address-pics .pics-list .pics-item{
		width:6rem;
		height: 5rem;
		margin-left: 0.7rem;
		display: inline-block;
	}
	.seller .seller-wrapper .seller-address .seller-address-pics .pics-list .pics-item img{
		width: 6rem;
		height:5rem
	}
	.seller .seller-wrapper .seller-address-safe{
		width: 100%;
		border-bottom: 0.5rem solid #eee;
		padding: 1rem 0.5rem;
		box-sizing: border-box;
		line-height: 1rem;
		display: flex;
	}
	.seller .seller-wrapper .seller-address-safe .left{
		width: 100%
	}
	.seller .seller-wrapper .seller-address-safe .left .img-res{
		width: 0.8rem;
		height: 1rem;
		display: block;
		float: left
	}
	.seller .seller-wrapper .seller-address-safe .left span{
		display:block;
		margin-left: 1.5rem;
		font-size: 0.8rem;
		font-weight: 550;
		letter-spacing: 1px
	}
	.seller .seller-wrapper .seller-address-safe .right{
		flex: 0 0 3rem
	}
	.seller .seller-wrapper .seller-address-safe .right span{
		display:block;
		float: right
	}
	.seller .seller-wrapper .seller-service{
		width: 100%;
		border-bottom: 1px solid #eee;
		padding: 1rem 0.5rem;
		box-sizing: border-box;
		line-height: 1rem
	}
	.seller .seller-wrapper .seller-service .img-res{
		width: 0.8rem;
		height: 1rem;
		display: block;
		float: left
	}
	.seller .seller-wrapper .seller-service span{
		display: block;
		font-size: 0.8rem;
		letter-spacing: 1px;
		font-weight: 550;
		margin-left:1.5rem;
	}
	.seller .seller-wrapper .seller-time{
		width: 100%;
		border-bottom: 1px solid #eee;
		padding: 1rem 0.5rem;
		box-sizing: border-box;
		line-height: 1rem;
		border-bottom: 0.5rem solid #eee
	}
	.seller .seller-wrapper .seller-time .img-res{
		width: 1rem;
		height: 1rem;
		display: block;
		float: left
	}
	.seller .seller-wrapper .seller-time span{
		display: block;
		font-size: 0.8rem;
		font-weight: 550;
		margin-left:1.5rem;
	}
	.seller .seller-wrapper .seller-end-service{
		width: 100%;
		border-bottom: 1px solid #eee;
		padding: 1rem 0.5rem;
		box-sizing: border-box;
		line-height: 1rem;
		overflow:hidden;
	}
	.seller .seller-wrapper .seller-end-service .img-res{
		width: 1rem;
		height: 1rem;
		display: block;
		float: left
	}
	.seller .seller-wrapper .seller-end-service span{
		display: block;
		font-size: 0.8rem;
		font-weight: 550;
		margin-left:0.3rem;
		float: left;
		margin-right: 1rem
	}
	.seller .seller-wrapper .new-users{
		width: 100%;
		border-bottom: 1px solid #eee;
		padding: 1rem 0.5rem;
		box-sizing: border-box;
		line-height: 1rem;
		overflow:hidden;
	}
	.seller .seller-wrapper .new-users .img-res{
		width: 1rem;
		height: 1rem;
		display: block;
		float: left
	}
	.seller .seller-wrapper .new-users span{
		display: block;
		font-size: 0.8rem;
		font-weight: 550;
		margin-left:1.5rem;
	}
</style>
