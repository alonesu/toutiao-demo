import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import notFonund from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'

import local from '@/utils/local'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: Welcome
        },
        {
          path: '/article',
          component: Article
        },
        {
          path: 'image',
          component: Image
        },
        {
          path: 'publish', component: Publish
        },
        {
          path: 'comment',
          component: Comment
        },
        // 粉丝
        {
          path: 'fans',
          component: Fans
        },
        {
          path: 'setting',
          component: Setting
        }
      ]
    },
    {
      path: '*',
      component: notFonund
    }
  ]
})
// 添加路由的 导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
  // 当每次跳转路由前触发
  // to 跳转到目标 路由对象
  // from 从哪里跳过来 路由对象
  // next 下一步方法 next()放行  next('/login') 拦截
  const user = local.getUser()
  // 如果登录
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
