<template>
  <div>
    <div class="goods">
	    <!-- 左边列表 -->
	    <div class="font-list" ref="fontScroll">
	    	<ul>
	    		<li class="item-list" :class="{'currect': currectIndex === 10 }" @click="selectMenu(0)">
	    			<img :src="goods.tag_icon"  class="item-img">
	   				<span class="item-title">{{goods.tag_name}}</span>
	    		</li>
	    		<li class="item-list" 
		    		v-for="(item,index) in container.food_spu_tags" 
		    		:key="index" 
		    		:class="{'currect': currectIndex === index + 1  }" 
		    		@click="selectMenu(index + 1)"
	    		>
	    			<img :src="item.icon" v-if="item.icon" class="item-img">
	   				<span class="item-title">{{item.name}}</span>
	   				<i class="count-all" v-show="calculateCount(item.spus)">
	   					<span>{{calculateCount(item.spus)}}</span>
	   				</i>
	    		</li>
	    	</ul>
	    </div>
	    <!-- 右侧列表 -->
	    <div class="goods-list" ref="goodsScroll">
	    	<ul>
	    		<!-- 专场 -->
	    		<li class="content-img-list item-content-hook">
	    			<div class="content-top " v-for="(item,index) in foodspic" :key="index">
	    				<img :src="item.pic_url">
	    			</div>
	    		</li>

	    		<!-- 具体食物列表 -->
	    		<li class="item-list item-content-hook" v-for="(item,index) in container.food_spu_tags" :key="index">
	   				<h3 class="item-title">{{item.name}}</h3>
	   				<ul>
	   					<li class="item-content " 
	   						v-for="(list , index) in item.spus" 
	   						:key="index"
	   						@click="showDetail(list)"
	   						>
	   						<div class="item-content-img">
	   							<img :src="list.picture">
	   						</div>
	   						<div class="item-content-list">
		   						<h3 style="width: 100%">{{list.name}}</h3>
		   						<span>{{list.month_saled_content}}</span>
		   						<span>{{list.praise_content}}</span>
		   						<p><i>¥{{list.min_price}}</i>/{{list.unit}}</p>
	   						</div>
	   						<div class="contral-wrapper">
	   							<app-card-contral :list="list"></app-card-contral>
	   						</div>
	   					</li>
	   				</ul>
	    		</li>
	    	</ul>
	    </div>
    </div>
    <!-- 底部 -->
    <app-shop :list="poi_info" :selectFoods="selectFood" :list2="discounts2"></app-shop>
    <!-- 商品详情页 -->
    <app-product-detail :list="foodDetail" ref="foodView"></app-product-detail>
  </div>
</template>

<script>
	import axios from 'axios'
	import BScroll from 'better-scroll'
	import Shop from './shop'
	import CardContral from './CardContral'
	import ProductDetail from '../productDetail/ProductDetail'
export default {
  name:'goods',
  data (){
  	return{
  		container:{},
  		goods:{},
  		foodspic:{},
  		heightList:[],
  		discounts2:[],
  		fontScroll:{},
  		goodsScroll:{},
  		scrollY:0,
  		poi_info:{},
  		food:[],
  		selectFoods:{},
  		foodDetail:{}
  	}
  },
  components:{
  	'app-shop':Shop,
  	'app-card-contral':CardContral,
  	'app-product-detail':ProductDetail
  },
  methods:{
  	getInfo (){
  		axios.get('static/data/goods.json').then(this.getInfoSuccess)
  	},
  	culcalateHight (){
  		//获取元素
  		let foodlist = this.$refs.goodsScroll.getElementsByClassName('item-content-hook')
  		// console.log(foodlist)
  		let height = 0
  		this.heightList.push(height)
  		for(var i = 0 ; i < foodlist.length; i++){
  			let item = foodlist[i];
  			height += item.clientHeight;
  			this.heightList.push(height);
  			// console.log(this.heightList)
  		}
  	},
  	getInfoSuccess (res){
  		res = res.data;
  		if(res.data){
  			this.container = res.data
  			this.goods = res.data.container_operation_source
  			this.foodspic = res.data.container_operation_source.operation_source_list
  			this.poi_info = res.data.poi_info
  			this.discounts2 = res.data.poi_info.discounts2[0]
  			this.food = res.data.food_spu_tags
  			//dom渲染成功后
  			this.$nextTick(() => {
  				//执行滚动方法
	  			this.initScroll()
	  			//计算分类的高度
	  			this.culcalateHight()
	  			//监听滚动的位置
	  			//根据滚动的位置确定下标和左侧进行对应
	  			//通过下表实现点击左侧，滚动右侧
  			})	
  		}
  	},
   	initScroll (){
		this.fontScroll = new BScroll(this.$refs.fontScroll,{
			click:true
		})
  		this.goodsScroll = new BScroll(this.$refs.goodsScroll,{
  			probeType: 3,
  			click:true
  		})
  		//监听滚动发生
  		this.goodsScroll.on("scroll", (pos) =>{
  			this.scrollY = Math.abs(Math.floor(pos.y - 20))
  			 // console.log(this.scrollY)
  		})
  	},
	selectMenu(index){
       let foodlist = this.$refs.goodsScroll.getElementsByClassName('item-content-hook')
       let element = foodlist[index]
       // console.log(element)
       this.goodsScroll.scrollToElement(element,250)
    },
    calculateCount (spus){
    	let countAll = 0
  		spus.forEach((list)=> {
  			if(list.count){
   				countAll += list.count
  			}
  		})
  		return countAll
  	},
  	showDetail (list){
  		this.foodDetail = list
  		this.$refs.foodView.showView()
  	}
  },
  created (){
  	this.getInfo();
  },
  computed:{
  	currectIndex (){
  		for(var i = 0 ; i < this.heightList.length; i ++){
  			//获取商品的区间范围
  			let height1 = this.heightList[i]
  			let height2 = this.heightList[i+1];
  			//判断商品的区间(!height2防止数组越界)
  			if(!height2 || (this.scrollY > height1 && this.scrollY < height2)){
  				// console.log(i)
  				return i
  			}
  		}
  		return 0
  	},
  	selectFood (){
  		let foods = [];
  		this.food.forEach((foodlist) => {
  			foodlist.spus.forEach((list) => {
  				if(list.count > 0){
  					foods.push(list)
  				}
  			})
  		})
  		return foods
  	}
  }
}
</script>

<style scoped>
	.goods{
		width: 100%;
		display: flex;
		position: absolute;
		top:12.4rem;
		bottom: 2.5rem;
		overflow: hidden;
	}
	.goods .font-list{
		flex:0 0 5rem;
		background-color: #f4f4f4;
	}
	.goods .goods-list{
		flex: 1;
		background-color: #f9f9f9
	}
	.goods .font-list .item-list{
		width: 100%;
		box-sizing: border-box;
		padding: 0.8rem 0.7rem;
		text-align: center;
		font-size: 0.8rem;
		border-bottom: 2px solid #eee;
		color:#555;
		position: relative;
	}
	.goods .font-list .item-img{
		width: 1rem;
		height: 1rem;
	}
	.goods .goods-list .content-img-list{
		width: 100%;
		padding: 0.3rem 0.5rem;
		box-sizing: border-box;
		border-bottom: 1px solid #eee
	}
	.goods .goods-list .content-img-list .content-top img{
		width: 100%;
		border-radius: 0.3rem
	}
	.goods .goods-list .item-list .item-title{
		width: 100%;
		color: #555;
		padding:0.3rem 0 0.3rem 0.3rem;
		box-sizing: border-box; 
		/*background: red;*/
		font-size: 0.85rem;
		font-weight: bold
	}
	.count-all{
		width: 0.8rem;
		height: 0.8rem;
		line-height: 0.8rem;
		border-radius: 50%;
		position: absolute;
		top: 0;
		right: 0.1rem;
		background-color: #f00;
		text-align: center;
		color: #fff;
	}
	.count-all span{
		display: block;
		transform:scale(0.8);
	}
	.goods .goods-list .item-list .item-content{
		width: 100%;
		padding:0.3rem 0 0.3rem 0.3rem;
		box-sizing: border-box; 
		display: flex;
		position: relative;
	}
	.goods .goods-list .item-list .item-content .contral-wrapper{
		width:5rem;
		height: 3.5rem;
		position: relative;
		right: 1rem;
		top: 1.7rem;
		padding:1rem 0.5rem;
		box-sizing: border-box;

	}
	.goods .goods-list .item-list .item-content .item-content-img{
		flex:0 0 4.5rem;
		padding: 1rem 0;
		box-sizing: border-box;
	}
	.goods .goods-list .item-list .item-content .item-content-img img{
		width: 100%
	}
	.goods .good-list .item-list .item-content h3{
		padding: 0.3rem 0.2rem 
	}
	.item-content-list{
		flex: 1;
		padding: 1rem 0 1rem 0.2rem;
	}
	.item-content-list h3{
		font-size: 0.85rem;
		color: #555;
		font-family: "微软雅黑";
		padding-bottom: 0.5rem;
		box-sizing: border-box;
	}
	.item-content-list span{
		color: #ccc;
		font-size: 0.5rem
	}
	.item-content-list p{
		margin-top: 0.2rem;
		font-size: 0.8rem;
		color: #ccc
	}
	.item-content-list p i{
		color: red
	}
	.currect{
		background: #fff;
		font-weight: bold;
	}
</style>
