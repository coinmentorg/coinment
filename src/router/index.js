import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/Rank'
import HotRank from '@/components/rank/Hot'
import NewRank from '@/components/rank/New'
import HighRank from '@/components/rank/High'
import Wallet from '@/components/wallet/Wallet'
import PostComment from '@/components/comment/Post'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/post',
      name: 'Post',
      component: PostComment
    },
    {
      path: '/rank',
      component: Rank,
      children:[
        {
          path: '',
          redirect: 'hot'
        },
        {
          path: 'hot',
          name: 'HotRank',
          component: HotRank
        },
        {
          path: 'new',
          name: 'NewRank',
          component: NewRank
        },
        {
          path: 'high',
          name: 'HighRank',
          component: HighRank
        }
      ]
    }
  ]
})
