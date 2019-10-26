import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomeworkPage1 from '@/components/HomeworkPage1'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HomeworkPage1',
      name: 'HomeworkPage1',
      component: HomeworkPage1
    }
  ]
})
