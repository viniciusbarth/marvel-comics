import Vue from "vue";
import VueRouter from "vue-router";

import Checkout from "../pages/checkout/Checkout";
import Home from "../pages/home/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
