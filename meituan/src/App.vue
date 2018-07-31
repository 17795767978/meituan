<template>
  <div id="app">
  	<!-- 头部 -->
    <app-comment :poi_info="poi_info"></app-comment>
    <!-- 导航 -->
    <app-nav :list="commentAll" class="see-you"></app-nav>
    <!-- 内容 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Comment from '@/components/comment/Comment'
import Nav from '@/components/comment/Nav'
import axios from 'axios'
export default {
  name: 'App',
  data (){
  	return {
  		poi_info:{},
      commentAll:0
  	}
  },
  components:{
  	'app-comment':Comment,
  	'app-nav':Nav

  },
  created (){
  	this.getInfo()
  },
  methods:{
  	getInfo (){
  		axios.get('/static/data/goods.json').then(this.getInfoSuccess)
      axios.get('/static/data/ratings.json').then(this.getRatingSuccess)
  	},
  	getInfoSuccess (res) {
  		 res = res.data;
  		 if(res.data){
  		 	this.poi_info = res.data.poi_info
  		 }
  	},
    getRatingSuccess (res){
      res = res.data
      if(res.data){
        this.commentAll = res.data.comment_num
      }
    }
  }

}
</script>

<style scoped>
  .see-you{
    position: relative;
  }
</style>
