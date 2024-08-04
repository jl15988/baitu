import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../Home.vue')
    },
    {
        path: '/modules',
        name: 'Modules',
        children: [
            {
                path: 'dateTime',
                name: 'dateTime',
                children: [
                    {
                        path: 'DateTime',
                        name: 'DateTime',
                        component: () => import('../modules/dateTime/DateTime.vue'),
                    },
                    {
                        path: 'DateUtil',
                        name: 'DateUtil',
                        component: () => import('../modules/dateTime/DateUtil.vue'),
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
