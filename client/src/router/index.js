import Vue from "vue"
import VueRouter from "vue-router"
import store from "./../store/index"
import Login from "../views/Login.vue"
import NotFound from "../views/NotFound.vue"
import Dashboard from "@/views/Dashboard"

Vue.use(VueRouter)

const authGuard = async (to, from, next) => {
  const isAuth = store.getters.isAuth
  if (!isAuth) return next({name: "Login"})

  const userRole = store.getters.role
  const routeRoles = to.meta?.roles
  if (!routeRoles || routeRoles.includes(userRole)) return next()

  return next({name: "NotFound"})
}

const beforeEnterLoginPage = async (to, from, next) => {
  const isAuth = store.getters.isAuth
  return isAuth ? next({name: "Bids"}) : next()
}

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: beforeEnterLoginPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: authGuard,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
    meta: {roles: [0, 1, 2, 3, 4, 5]},
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
