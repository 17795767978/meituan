<template>
  <div class="nav">
  	<router-link to="/goods" class="item-link">
  		点餐
  		<i class="item-down"></i>
  	</router-link>
  	<router-link to="/ratings" class="item-link">
  		评价({{ list }})
  		<i class="item-down"></i>
  	</router-link>
  	<router-link to="/seller" class="item-link">
  		卖家
  		<i class="item-down"></i>
  	</router-link>

  </div>
</template>

<script>
export default {
  name: 'navLand',
  data () {
    return {
      
    }
  },
  props:{
  	list:{
  		type:Number
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.nav{
		width: 100%;
		display: flex;
		line-height: 2.5rem;
		height: 2.5rem;
		border-bottom:1px solid #e6e6e6;
		background: white;
	}
	.item-link{
		flex: 1;
		text-align: center;
		text-decoration: none;
		color:#666;
		font-size:0.8125rem;
		position: relative;
	}
	.active{
		color:#ffbb22;
	}
	.active .item-down{
		width: 1.25rem;
		height: 0.0125rem;
		position: absolute;
		bottom: 0px;
		left:50%;
		margin-left:-0.625rem;
		background-color: #ffbb22;
	}  
</style>
