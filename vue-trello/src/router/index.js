import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import store from '../store'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  store.getters.isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
  mode : 'history',
  routes : [
    {
      path : '/',
      component : Home,
      // beforeEnter : requireAuth()
    },
    {
      path : '/login',
      component : Login
    },
    {
        // 콜론을 넣어주면 bid라는 변수로 받을 수 있음.
        path : '/b/:bid',
        component : Board, 
        // beforeEnter : requireAuth(),
        children : [
            {
                path : 'c/:cid', 
                component : Card,
                // beforeEnter : requireAuth()
            }
        ]
    },
    {
      path : '*',
      component : NotFound
    }
  ] 
})

export default router