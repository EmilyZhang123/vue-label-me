import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import labelMain from '../views/labelMain.vue'
import TestFabric from '../views/TestFabric.vue'
import sketchpad from '../components/sketchpad.vue'

Vue.use(VueRouter);

const routes = [
    {path:'/',redirect:{name:"labelMain"}},//重定向
    {
      path: '/',
      name: 'labelMain',
      component: labelMain
    },
    {
      path: '/testFabric',
      name: 'test-fabric',
      component: TestFabric
    },
    {
      path: '/sketchpad',
      name: 'sketchpad',
      component: sketchpad
    },
    {
      path: '/about',
      name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      //为匹配路由的处理跳转
      path:'*',
      name:'labelMain',
      component:labelMain
    }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
    if (to.matched.length ===0) {  //如果未匹配到路由
        from.path? next({ path:from.path}) : next('/');   //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
    } else {
        next();    //如果匹配到正确跳转
    }
});
export default router
