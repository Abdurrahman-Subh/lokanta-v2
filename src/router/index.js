import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Add from "../views/Add.vue";
import Table from "../views/Table.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/yeni-masa",
    name: "add",
    component: Add,
  },
  {
    path: "/table/:id",
    name: "table",
    component: Table,
  },
  // {
  //   path: "/about",
  //   name: "about",
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
