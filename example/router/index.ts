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
                path: 'string',
                name: 'string',
                children: [
                    {
                        path: 'StrUtil',
                        name: 'StrUtil',
                        component: () => import('../modules/string/StrUtil.vue')
                    }
                ]
            },
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
                    },
                    {
                        path: 'DateFestival',
                        name: 'DateFestival',
                        component: () => import('../modules/dateTime/DateFestival.vue'),
                    }
                ]
            },
            {
                path: 'file',
                name: 'File',
                children: [
                    {
                        path: 'FileUtil',
                        name: 'FileUtil',
                        component: () => import('../modules/file/FileUtil.vue'),
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
