import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
const Home = () => import("@/views/Home.vue");
const routes: Array<any> = [
  {
    path: "/",
    name: "Home",
    hidden: false,
    component: Home,
    children: [
      // 菜单一
      {
        path: "/console",
        name: "Console",
        hidden: false,
        meta: {
          title: "菜单一"
        },
        component: () => import("../views/console/console.vue"),
        children: [
          {
            path: "/item1",
            name: "Item1",
            hidden: false,
            meta: {
              title: "导航一"
            },
            component: () => import("../views/console/item1.vue")
          },
          {
            path: "/item2",
            name: "Item2",
            hidden: false,
            meta: {
              title: "导航二"
            },
            component: () => import("../views/console/item2.vue")
          }
        ]
      },
      // 菜单二
      {
        path: "/info",
        name: "Info",
        hidden: false,
        meta: {
          title: "菜单二"
        },
        component: () => import("../views/info/item1.vue"),
        children: [
          {
            path: "/Item3",
            name: "Item3",
            hidden: false,
            meta: {
              title: "导航一"
            },
            component: () => import("../views/info/item1.vue")
          },
          {
            path: "/Item4",
            name: "Item4",
            hidden: false,
            meta: {
              title: "导航二"
            },
            component: () => import("../views/info/item2.vue")
          }
        ]
      },
      // 用户中心
      {
        path: "/user",
        name: "User",
        hidden: true,
        meta: {
          title: "用户中心"
        },
        component: () => import("../views/user/userCenter.vue"),
        children: [
          {
            path: "/userCenter",
            name: "userCenter",
            hidden: true,
            meta: {
              title: "用户中心"
            },
            component: () => import("../views/user/userCenter.vue")
          },
          {
            path: "/changePassword",
            name: "ChangePassword",
            hidden: true,
            meta: {
              title: "修改密码"
            },
            component: () => import("../views/user/changePassword.vue")
          }
        ]
      },
      // login
      {
        path: "/login",
        name: "Login",
        hidden: true,
        meta: {
          title: "登录"
        },
        component: () => import("../views/login/login.vue")
      }
    ]
  },
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
