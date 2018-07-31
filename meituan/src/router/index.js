import Vue from 'vue'
import Router from 'vue-router'
// import Comment from '@/components/comment/Comment'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'comment',
    //   component: Comment
    // },
    {
      path:'/ratings',
      name:'ratings',
      component:Ratings
    },
    {
      path:'/goods',
      name:'goods',
      component:Goods
    },
    {
      path:'/seller',
      name:'seller',
      component:Seller
    }
  ],
  mode:'history',
  linkActiveClass:"active"
})
