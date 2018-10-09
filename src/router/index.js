import Vue from 'vue'
import Router from 'vue-router'
import ageMusic from '@/components/ageMusic'
import sheet from '@/components/sheet/sheet'
import sheetlist from '@/components/sheet/sheetlist'
import playlist from '@/components/playlist/playlist'
import search from '@/components/search/search'
import likemusic from '@/components/likemusic/likemusic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/music'
    },
    {
      path: '/music',
      component: ageMusic,
      redirect: '/music/sheet',
      children: [
        {
          path: '/music/sheet',//每日歌单
          component: sheet
        },
        {
          path: '/music/sheetlist',//歌单列表
          component: sheetlist
        },
        {
          path: '/music/playlist',//历史列表 
          component: playlist
        },
        {
          path:'/music/search',//搜索
          component:search
        },
        {
          path:'/music/likemusic',//搜索
          component:likemusic
        }
      ]
    }
  ]
})
