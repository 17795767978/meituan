<template>
  <div class="ratings"  ref="ratingScroll">
  	<div class="ratings-wrapper">
  		<!-- 评分表头 -->
  		<div class="rating-top">
  			<div class="top-left">
  				<span class="ratings-score">{{dataAll.comment_score}}</span>
  				<span class="ratings-com">商家评分</span>
  			</div>
  			<div class="top-middle">
  				<div class="first-score">
	  				<span>口味</span>
	  				<app-star :score="dataAll.quality_score" class="appStar"></app-star>
	  				<span>{{dataAll.quality_score}}</span>
  				</div>
  				<div class="second-score">
	  				<span>包装</span>
	  				<app-star :score="dataAll.pack_score" class="appStar"></app-star>
	  				<span>{{dataAll.pack_score}}</span>
  				</div>
  			</div>
  			<div class="top-right">
  				<span class="delivery-score">{{dataAll.delivery_score}}</span>
  				<span class="delivery-font">配送评分</span>
  			</div>
  		</div>
		<!-- 导航 -->
		<div class="ratings-nav" v-if="this.tabs.length != 0">
			<div class="ratings-nav-content-left" :class="{'active' : this.commentsType == 2}" @click="changeView(2)">
				{{ tabs[0].comment_score_title}}
			</div>
			<div class="ratings-nav-content-middle" :class="{'active' : this.commentsType == 1}" @click="changeView(1)">
				{{ tabs[1].comment_score_title}}
			</div>
			<div class="ratings-nav-content-right" :class="{'active' : this.commentsType == 0}" @click="changeView(0)">
				{{ tabs[2].comment_score_title}}
			</div>
		</div>
		<!-- 评论分类 -->
		<div class="comment-list">
			<span v-for="(label , index) in labels" :key="index" class="comment-list-content">
				{{label.content}}
				{{label.label_count}}
			</span>
		</div>
		<!-- 评论列表详情 -->
		<div class="comment-detail">
			<ul class="comment-detail-all">
				<li class="comment-detail-all-list" v-for="(comment , index) in commentsFor" :key="index">
					<div class="left">
						<img :src="comment.user_pic_url"  class="img-res">
					</div>
					<div class="right">
						<div class="title">
							<span>{{comment.user_name}}</span>
							<span>{{comment.comment_time}}</span>
						</div>
						<div class="star">
							<div class="name">
								<span>评分</span>
							</div>
							<app-star :score="comment.order_comment_score"></app-star>	
						</div>
						<div class="pic" v-if="comment.comment_pics.length != 0">
							<img :src="comment.comment_pics[0].thumbnail_url">
						</div>
						<div class="content">
							<p>{{ comment.comment }}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
  	</div>
  </div>
</template>

<script>
import axios from 'axios'
import Star from '../star/Star'
import BScroll from 'better-scroll'

const ALL = 2
const PICTURE = 1
const DP = 0
export default {
  name: 'ratings',
  data () {
    return {
      dataAll:{},
      tabs:[],
      labels:[],
      comments:{},
      commentsType: ALL
    }
  },
  components:{
  	'app-star':Star
  },
  methods:{
  	getRatings (){
  		axios.get('/static/data/ratings.json').then(this.getRatingsSuccuss)
  	},
  	getRatingsSuccuss (res){
  		res = res.data
  		if(res.data){
  			this.dataAll = res.data
	  		this.tabs = res.data.tab
	  		this.labels = res.data.labels
	  		this.comments = res.data.comments
  		}
  		
  		//滚动
  		this.$nextTick( () => {
  			if(!this.scroll){
  				this.scroll = new BScroll(this.$refs.ratingScroll,{
  					click:true
  				})
  			}else{
  				this.scroll.refresh()
  			}
  		})
  	},
  	changeView (type){
  		this.commentsType = type
  	}
  },
  created (){
  	this.getRatings()
  },
  computed:{
  	commentsFor (){
  		if(this.commentsType == ALL){
  			return this.comments
  		}else if(this.commentsType == PICTURE){
  			let arr = [];
  			this.comments.forEach((comment) => {
  				if(comment.comment_pics.length){
  					arr.push(comment)
  				}
  			})
  			console.log(arr)
  			return arr
  		}else{
  			console.log(this.dataAll.comments_dp.comments)
  			return this.dataAll.comments_dp.comments
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  	.ratings{
  		width: 100%;
		position: absolute;
		top: 12.4rem;
		left: 0;
		bottom: 0;
		overflow:hidden;
		z-index: -1
  	}
	.ratings-wrapper .rating-top{
		width: 100%;
		display: flex;
		flex: 1;
		padding: 1rem 0.5rem;
		box-sizing: border-box;
		border-bottom: 0.6rem solid #eeefef
	}
	.ratings-wrapper .rating-top .top-left{
		flex:0 0 4.5rem;
		text-align: center;
	}
	.ratings-wrapper .rating-top .top-left .ratings-score{
		color: #ffb000;
		font-size: 1.5rem;
		font-weight: bold;
		display: block;
		margin-bottom: 0.4rem
	}
	.ratings-wrapper .rating-top .top-left .ratings-com{
		font-size: 0.6rem;
		color:#777;
	}
	.ratings-wrapper .rating-top .top-middle{
		width: 100%;
		text-align: left;
		padding-left:0.6rem;
		font-size: 0.85rem ;
		color:#777;
		border-right: 3px solid #ccc;
		box-sizing: border-box;
	}
	.ratings-wrapper .rating-top .top-middle .appStar{
		padding: 0 0.3rem;
		box-sizing: border-box;
	}
	.ratings-wrapper .rating-top .top-middle .first-score{
		width: 100%;
		height: 50%;
		padding-top:0.2rem;
		display: flex;
	}
	.ratings-wrapper .rating-top .top-middle .second-score{
		width: 100%;
		height: 50%;
		padding-top:0.2rem ;
		display: flex;
	}
	.ratings-wrapper .rating-top .top-right{
		flex:0 0 4.5rem; 
		text-align: center;
		box-sizing: border-box;
	}
	.ratings-wrapper .rating-top .top-right .delivery-score{
		font-size: 1.4rem;
		color:#777;
		display: block;
		margin-bottom:0.4rem;
	}
	.ratings-wrapper .rating-top .top-right .delivery-font{
		font-size: 0.8rem;
		color: #777;
	}
	.ratings-wrapper .ratings-nav{
		width: 90%;
		margin:1rem auto;
		border:1px solid #ffb000;
		border-radius: 5px;
		display: flex;
		text-align: center;
		font-size: 0.8rem;
		box-sizing: border-box;
	}
	.ratings-wrapper .ratings-nav .ratings-nav-content-left{
		width: 33%;
		padding: 0.5rem 0;	
		color:#ffb000;
	}
	.ratings-wrapper .ratings-nav .ratings-nav-content-middle{
		width: 33%;
		border-left:1px solid #ffb000;
		border-right: 1px solid #ffb000;
		padding: 0.5rem 0;
		color:#ffb000;
	}
	.ratings-wrapper .ratings-nav .ratings-nav-content-right{
		width: 33%;	
		padding: 0.5rem 0;	
		color:#ffb000;	
	}
	.active{
		background-color: #ffb000;
		color: #000 !important;
	}
	.ratings-wrapper .comment-list{
		width: 90%;
		margin:-0.4rem auto 0;
	}
	.ratings-wrapper .comment-list .comment-list-content{
		display: inline-block;
		background-color: #eee;
		padding: 0.4rem;
		font-size: 0.7rem;
		margin: 0.2rem;
		color: #777
	}
	.ratings-wrapper .comment-detail{
		width: 95%;
		margin:0 auto;
		overflow:hidden;
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list{
		padding: 1rem 0.3rem;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		display: flex;
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .left{
		flex:0 0 3rem;
		padding: 0.5rem 0.5rem;
		box-sizing: border-box;
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .left .img-res{
		width:2rem;
		height: 2rem;
		display: block;
		border-radius: 50%
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .right{
		width: 100%;
		padding: 0.5rem;
		box-sizing: border-box;
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .title {
		font-size: 0.7rem;
		margin-bottom: 1rem
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .title span:first-child{
		display: inline-block;
		float: left
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .title span:last-child{
		display: inline-block;
		float: right;
		color:#ccc;
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .star{
		width: 100%;
		font-size: 0.7rem;
		margin:0.5rem 0;
		display: flex
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .pic{
		width: 100%;
		margin-bottom: 0.5rem;
		display: flex
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .pic img{
		width: 5rem;
		height: 5rem;
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .star .name span{
		display: inline-block;
		width: 2rem;
		line-height: 1.8rem;
		color:#ccc;
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .content{
		width: 100%;
		font-size: 0.8rem;
		color:#333;
		font-weight: 500;
	}
	.ratings-wrapper .comment-detail .comment-detail-all-list .content p{
		line-height: 150%
	}
</style>
