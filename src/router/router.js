import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/account/Login.vue'
import Register from '@/views/account/Register.vue'
import Home from '@/views/users/Home.vue'
import BookDetails from '@/views/users/BookDetails.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/book/:id', component: BookDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
