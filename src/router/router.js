import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/users/HomePage.vue'
import LoginPage from '@/views/account/LoginPage.vue'
import BookDetails from '@/views/users/BookDetails.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    component: HomePage,
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/login',
    component: LoginPage,
    name: "Login"
  },
  {
    path: '/book/:id',
    component: BookDetails,
    name: "Book Details",
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  const isRequiredAuth = to.meta.requiresAuth

  if (to.name === "Login" && isAuthenticated) return next("/home")

  if (!isRequiredAuth) return next()

  if (isAuthenticated) return next()
  else return next ("/login")
});


export default router
