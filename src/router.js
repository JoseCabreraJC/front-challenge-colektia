import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/productos",
    name: "productos",
    component: () => import("./components/ProductList.vue"),
  },
  {
    path: "/productos/:id",
    name: "producto-details",
    component: () => import("./components/Product.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddProduct.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("./components/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
