import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/new",
      name: "new-recpie",
      component: () => import("../views/NewRecipeView.vue"),
    },
    {
      path: "/recipe/:id",
      name: "recipe",
      component: () => import("../views/RecipeView.vue"),
    },
    {
      path: "/public",
      name: "public",
      component: () => import("../views/PublicCookBookView.vue"),
    },
    {
      path: "/private",
      name: "private",
      component: () => import("../views/PrivateCookBookView.vue"),
    },
  ],
});

export default router;
