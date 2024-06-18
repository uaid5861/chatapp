import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        redirect: '/home/message'  // 默认重定向到 /home
      },
    {
       
        path: '/home',
        name: "home",
        component: () => import('@/pages/MyHome.vue'),
        meta: {title: 'home'},
        children: [
            {
                path: '/home/chathome',
                component: () => import('@/components/ChatHome.vue'),
                meta: {title: 'ChatHome'}
            },
            {
                path: '/home/message',
                component: () => import('@/components/ChatApp.vue'),
                meta: {title: 'Message'}
           },
        ]
    },
    // {
    //     path: '/test1',
    //     name: "test1",
    //     component: () => import('@/pages/test1.vue')   
    // },
    // {
    //     path: '/test2',
    //     name: "test2",
    //     component: () => import('@/pages/test2.vue')   
    // },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
