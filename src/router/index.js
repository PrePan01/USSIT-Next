import { createRouter, createWebHashHistory } from "vue-router";
const home = () => import("../views/home.vue")
const flow_perception_hefei = () => import("../views/flow_perception_hefei.vue")
const flow_perception_taian = () => import("../views/flow_perception_taian.vue")
const park_nanshan = () => import("../views/park_nanshan.vue")
const flow_2_3 = () => import("../views/flow_2_3.vue")
const flow_1_1 = () => import("../views/flow_1_1.vue")
const flow_2_1 = () => import("../views/flow_2_1.vue")
const flow_2_4 = () => import("../views/flow_2_4.vue")
const flow_3_1 = () => import("../views/flow_3_1.vue")
const flow_3_2 = () => import("../views/flow_3_2.vue")
const flow_3_4 = () => import("../views/flow_3_4.vue")
const flow_3_5 = () => import("../views/flow_3_5.vue")
const flow_4_1 = () => import("../views/flow_4_1.vue")
const flow_2 = () => import("../views/flow_2.vue")
const flow_3 = () => import("../views/flow_3.vue")
const routes = [
  {
    path: '/',
    name:'home',
    component: flow_1_1
  },
  {
    path: '/home',
    name:'homepage',
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
  },
  {
    path: "/flow_2_3",
    name: "flow_2_3",
    component: flow_2_3
  },
  {
    path: "/flow_1_1",
    name: "flow_1_1",
    component: flow_1_1
  },
  {
    path: "/flow_2",
    name: "flow_2",
    component: flow_2
  },
  {
    path: "/flow_2_1",
    name: "flow_2_1",
    component: flow_2_1
  },
  {
    path: "/flow_2_4",
    name: "flow_2_4",
    component: flow_2_4
  },
  {
    path: "/flow_3",
    name: "flow_3",
    component: flow_3
  },
  {
    path: "/flow_3_1",
    name: "flow_3_1",
    component: flow_3_1
  },
  {
    path: "/flow_3_2",
    name: "flow_3_2",
    component: flow_3_2
  },
  {
    path: "/flow_3_4",
    name: "flow_3_4",
    component: flow_3_4
  },
  {
    path: "/flow_3_5",
    name: "flow_3_5",
    component: flow_3_5
  },
  {
    path: "/flow_4_1",
    name: "flow_4_1",
    component: park_nanshan
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router