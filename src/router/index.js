import { createRouter, createWebHistory } from "vue-router";
const home = () => import("../views/home.vue")
const flow_perception_hefei = () => import("../views/flow_perception_hefei.vue")
const flow_perception_taian = () => import("../views/flow_perception_taian.vue")
const park_nanshan = () => import("../views/park_nanshan.vue")

const routes = [
  {
    path: '/',
    name:'home',
    component: home
  },
  {
    path: "/flow_perception_hefei",
    name: "flow_perception_hefei",
    component: flow_perception_hefei
  },
  {
    path: "/flow_perception_taian",
    name: "flow_perception_taian",
    component: flow_perception_taian
  },
  {
    path: "/park_nanshan",
    name: "park_nanshan",
    component: park_nanshan
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router