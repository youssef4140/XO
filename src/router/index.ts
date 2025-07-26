import { createRouter, createWebHistory } from 'vue-router'
import RoomManager from '../views/RoomManager.vue'
import GameBoard from '@/views/GameBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RoomManager,
    },
    {
      path:'/game',
      name:'game',
      component:GameBoard
    }
   
  ],
})

export default router
