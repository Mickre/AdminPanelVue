import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/images",
    name: "Images",
    redirect: "/images/1",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/images/:id",
    name: "ImagesID",
    component: () =>
      import(/* webpackChunkName: "images" */ "@/views/Image.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/blogs",
    component: () => import(/* webpackChunkName: "blogs" */ "@/views/Blog.vue"),
    children: [
      {
        path: "/",
        name: "Blogs",
        redirect: "/blogs/1",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: ":id",
        name: "BlogsID",
        component: () =>
          import(/* webpackChunkName: "blogIndex" */ "@/views/Blog/Index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: ":search/:id",
        name: "BlogsSearchID",
        component: () =>
          import(
            /* webpackChunkName: "blogSearch" */ "@/views/Blog/Search.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/blog/add",
    name: "BlogAdd",
    component: () =>
      import(/* webpackChunkName: "blogs-add" */ "@/views/Blog/Add.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/blog/:id",
    name: "BlogEdit",
    component: () =>
      import(/* webpackChunkName: "blogs-edit" */ "@/views/Blog/Edit.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: "error" */ "@/views/Error.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
