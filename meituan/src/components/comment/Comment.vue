<template>
  <div class="header">
    <div class="top-wrapper">
    	<div class="back-wrapper">
    		<span class="icon-arrow_lift"></span>
    	</div>
	    <form class="search-wrapper">
	    	<i class="search-icon"></i>
	    	<input type="text" name="search" class="search-bar" placeholder="搜索店内商品" >
	    </form>
	    <div class="more-wrapper">
	    	<a href="#" class="spelling-bt">拼单</a>
	    	<div class="more-bt">
	    		<i class="s-radius"></i>
	    		<i class="s-radius"></i>
	    		<i class="s-radius"></i>
	    	</div>
	    </div>
	</div> 
	<div class="bg-wrapper" :style="head_pic_url">
		<!-- <img :src="poi_info.head_pic_url" class="bg-img"> -->
	</div> 
	<!-- 内容 -->
	<div class="middle-content">
		<div class="icon" :style="pic_url"></div>
		<div class="content">
			<h3>{{poi_info.name}}</h3>
		</div>
		<div class="right-btn">
			<img src="./imgs/star.png" class="star">
			<span class="collect">收藏</span>
		</div>
	</div> 
	<!-- 底部活动 -->
	<div class="active-wrapper">
    <div class="left">
      <img v-if="poi_info.discounts2" :src="poi_info.discounts2[0].icon_url" class="icon">
      <span v-if="poi_info.discounts2" class="content-act">{{ poi_info.discounts2[0].info}}</span>
    </div>
		<div class="detail" v-if="poi_info.discounts2" @click="showBtn">
			{{poi_info.discounts2.length}}个活动
			<span class="icon-keyboard_arrow_right"></span>
		</div>
	</div>
	<!-- 公告详情页 -->
	<div class="showBtn-detail" v-show="isShow">
		<div class="detail-wrapper" >
			<div class="content" :style="poi_back_pic_url">
				<div class="icon" :style="pic_url"></div>
				<h3 class="name">{{poi_info.name}}</h3>
        <!-- 星级评价 -->
        <div class="score">
          <app-star :score="poi_info.wm_poi_score"></app-star>
          <span class="score-font">{{ poi_info.wm_poi_score }}</span>
        </div>
			</div>
			<div class="deliver">
				<div class="deliver-title">
					<span>{{poi_info.min_price_tip}}</span><i class="deliver-fix">|</i>
					<span>{{poi_info.shipping_fee_tip}}</span><i class="deliver-fix">|</i>
					<span>{{poi_info.delivery_time_tip}}</span>
				</div>
				<h3 class="deliver-down">配送时间：{{poi_info.shipping_time}}</h3>
				<hr/>
				<div class="deliver-act">
					<img v-if="poi_info.discounts2" :src="poi_info.discounts2[0].icon_url" class="deliver-icon">
					<span v-if="poi_info.discounts2" class="deliver-content-act">{{ poi_info.discounts2[0].info}}</span>
				</div>
			</div>	
		</div>
		<div class="close" @click="closeBtn">
			<span class="icon-close"></span>
		</div>
	</div>
  </div>
</template>

<script>
  import Star from '../star/Star'
export default {
  name: 'headerLand',
  props:{
  	poi_info:{
  		type:[Object,String],
  		default:''
  	}
  },
  components:{
    'app-star': Star
  },
  data (){
  	return {
  		isShow:false
  	}
  },
  methods:{
  	showBtn (){
  		this.isShow = true
  	},
  	closeBtn (){
  		this.isShow = false
  	}
  },
  computed:{
  	head_pic_url (){
  		return "background-image:url("+ this.poi_info.head_pic_url +");"
  	},
  	pic_url (){
  		return "background-image:url("+ this.poi_info.pic_url +");"
  	},
  	poi_back_pic_url (){
  		return "background-image:url("+ this.poi_info.poi_back_pic_url +")"
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(../../common/css/icon.css);
  .header{
  	height: 8.6rem;
  	padding-top:1.25rem;
    position: relative;
    z-index: 1;
    top:0;
  }
  .header .top-wrapper{
  	width: 100%;
  	height: 2rem;
  	position: relative;
  }
  .header .top-wrapper .back-wrapper{
  	width: 3rem;
  	height: 100%;
  	line-height:2rem;
  	text-align: center;
  	font-size: 1rem;
  	color:#fff;
/*  	background-color: #f00;*/
  	position: absolute;
  	left:0;
  	top: 0
  }
  .header .top-wrapper .search-wrapper{
  	width: 100%;
  	height: 100%;
  	padding: 0 5.5rem 0 3rem; 
  	float: left;
  	/*background-color: #ff0;*/
  	box-sizing: border-box;
  	position: absolute;
  	left:0;
  	top: 0
  }
 .header .top-wrapper .search-wrapper .search-icon{
  	width: 2rem;
  	height:2rem;
  	background:url(./imgs/search.png) no-repeat center ;
  	background-size: 13px 13px
  }
  .search-bar{
  	width: 100%;
  	box-sizing: border-box;
  	height: 100%;
  	border-radius:1rem;
  	padding-left:1.5rem;
  	background-color: #eee;
  	border:0;
  	outline: none;
  }
  .more-wrapper{
  	width: 5rem;
  	height: 100%;
  	line-height:2rem;
  	box-sizing: border-box;
  	float:right;
  	padding:0 0.5rem;
  	/*background-color: #f0f;*/
  	display: flex;
  }
  .spelling-bt{
  	width: 50%;
  	height: 1.5rem;
  	margin-top:0.28rem;
  	line-height:1.5rem;
  	font-size: 0.6rem;
  	text-align: center;
    border:1px solid #fff;
    color:#fff;
    text-decoration: none
  }
  .more-bt{
  	width: 40%;
  	height: 2rem;
  	text-align: center;
    padding:0 0.4rem;
    color:#fff;
    float:right;
  }
  .s-radius{
  	width: 3px;
  	height:3px;
  	border-radius: 50%;
  	float:left;
  	border:1px solid #fff;
  	margin-left:0.1rem;
  	margin-top:0.85rem;
  }
 .bg-wrapper{
  	width: 100%;
  	height:10rem;
  	margin-top:-3.3rem;
  	position: relative;
  	z-index: -1;
  	background-size: 100% 120%;
  	background-position: center -12px;
  }
  .header .middle-content{
  	width: 100%;
  	padding: 0 0 0 1rem;
  	box-sizing: border-box;
  	height: 5rem;
  	position: absolute;
  	top:3.5rem;
/*  	background-color: #f00;*/
  	
  }
  .header .icon{
  	width: 3.4rem;
  	height: 3.5rem;
  	float:left;
  	margin-top:0.8rem;
  	background-size: 100% 100%
  }
  .header .content{
  	width:70%;
  	height: 3.5rem;
  	box-sizing: border-box;
  	line-height: 3.5rem;
  	float: left;
  	padding-left:1rem;
  	margin-top:0.8rem;
  	color: #fff
  }
  .header .right-btn{
  	width: 3rem;
  	height: 3.5rem;
  	margin-top: 0.8rem;
  	text-align: center;
  	position: relative;
  	float: right
  }
  .header .right-btn img{
  	width: 1.5rem;
  	display: block;
  	position: absolute;
  	left: 50%;
  	top:50%;
  	margin-top: -1rem;
  	margin-left:-0.75rem;
  }
  .header .right-btn span{
  	display: block;
  	margin-top:2.5rem;
  	font-size: 0.85rem;
  	color: #fff
  }
  .header .active-wrapper{
  	width: 100%;
  	height: 2rem;
  	line-height: 2rem;
  	margin-bottom: 0;
  	position: absolute;
  	top:8rem;
  	padding: 0 0.2rem 0 1rem;
  	box-sizing: border-box;
    display: flex
  }
  .header .active-wrapper .left{
    width:80%
  }
  .header .active-wrapper .icon{
  	width: 1rem;
  	height:1rem;
  	margin-top: 0.5rem;
  	display: block;
    float:left;
  }
  .header .active-wrapper .content-act{
    width: 90%;
  	font-size: 10px !important;
  	color: #fff;
  	margin-left:1.3rem;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .header .active-wrapper .detail{
  	flex:0 0 4rem;
  	line-height: 2rem;
  	color: #fff;
  	font-size: 0.1rem;
  }
  .showBtn-detail{
  	width: 100%;
  	height:100%;
  	position: fixed;
  	top:0;
    left: 0;
    bottom:0;
  	background: rgba(98, 98, 98, 0.8);
  	z-index: 999;

  }
  .header .showBtn-detail .detail-wrapper{
  	width: 100%;
  	height: 100%;
  	margin:0;
  	padding: 3rem 2rem 8rem 2rem;
  	box-sizing: border-box;
  	background-size: 100% 100%
  }
  .header .showBtn-detail .detail-wrapper .content{
  	width: 100%;
  	height: 100%;
  	text-align: center;
  	position: relative;
  	border-radius: 0.8rem;
  	
  }
  .header .showBtn-detail .detail-wrapper .content .icon{
  	width: 3.6rem;
  	height: 3.8rem;
  	position: absolute;
  	top:2rem;
  	left: 50%;
  	margin-left:-1.8rem;
  	border-radius: 0.3rem
  }
  .header .showBtn-detail .detail-wrapper .content .name{
  	margin-top: 6.5rem;
  	color: #fff;
  	font-size: 1rem
  }
  .score{
    width: 100%;
    text-align: center;
    height: 1rem;
    margin-top: -2rem;
    position: relative;
  }
  .score .score-font{
    display: block;
    width: 3rem;
    height: 3rem;
    text-align: center;
    position: absolute;
    top: -0.3rem;
    right: 50%;
    margin-right:-4.2rem;
    font-size: 0.4rem
  }
  .header .showBtn-detail .detail-wrapper .deliver{
  	width: 70%;
  	text-align: center;
  	position: absolute;
  	top:14rem;
  	left: 15%
  }
  .header .showBtn-detail .detail-wrapper .deliver .deliver-title{
  	width:100%;
  	display: flex;
  	margin-bottom: 0.3rem
  }
  .header .showBtn-detail .detail-wrapper .deliver .deliver-title span{
  	flex: 1;
  	color: #bbb;
  	font-size: 0.3rem;
  }
  .deliver-fix{
  	color: #bbb;
  	font-size: 0.3rem
  }
  .header .showBtn-detail .detail-wrapper .deliver .deliver-down{
  	color: #bbb;
  	font-size:0.7rem;
  	margin-bottom: 1.5rem
  }
  .header .showBtn-detail .detail-wrapper .deliver .deliver-act{
  	margin-top: 1.5rem;
  	width:100%;
  	text-align: center;
  	color: #bbb;
  }
  .header .showBtn-detail .detail-wrapper .deliver .deliver-act .deliver-icon{
  	width: 1rem;
  	height: 1rem;
  	float: left;
  }
  .header .showBtn-detail .detail-wrapper .deliver .deliver-act .deliver-content-act{
  	font-size:0.8rem;
  	line-height: 1rem;
  	margin-left: 3px
  }
  .header .showBtn-detail .close{
  	width: 2.5rem;
  	height: 2.5rem;
  	background-color: rgba(255,255,255,0.5);
  	position: absolute;
  	left: 50%;
  	margin-left: -1.25rem;
  	bottom:3rem;
  	border-radius: 50%
  } 
   .header .showBtn-detail .close span{
   	color: #fff;
   	font-size: 2.5rem
   }
</style>