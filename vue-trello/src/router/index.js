import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode : 'history',
  routes : [
    {
      path : '/',
      component : Home
    },
    {
      path : '/login',
      component : Login
    },
    {
        // 콜론을 넣어주면 bid라는 변수로 받을 수 있음.
        path : '/b/:bid',
        component : Board, 
        children : [
            {
                path : 'c/:cid', component : Card
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