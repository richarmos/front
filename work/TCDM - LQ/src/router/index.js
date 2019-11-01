import Vue from "vue";
import Router from "vue-router";
import baseMain from "@/views/baseMain";
import login from "@/views/login";

Vue.use(Router);

var routes = [
  {
    path: "/baseMain",
    component: baseMain,
    name: "baseMain",
    children: [],
    beforeEnter: (to, from, next) => {
      next(); //resolve 钩子
    }
  },
  {
    path: "/login",
    component: login,
    name: "login",
  },
  {
    path: "/",
    redirect: "/login"
  }
];

var menus = [
  {
    name: "test",
    path: "/test",
    component: () => import('@/views/test/index')
  },
  {
    name: "test1",
    path: "/test1",
    component: () => import('@/views/test/index1')
  }
];

menus.forEach(({ name, path, component, meta }) => {
  routes[0].children.push({
    path: path,
    name: name,
    component: component
  });
});

// console.log(routes);
export { menus };

const router = new Router({
  routes
});

router.afterEach((to, from) => {
  console.log(to, "后置第一个参数");
  console.log(from, "后置第二个参数");

});

export default router
