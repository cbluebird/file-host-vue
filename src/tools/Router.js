import {createRouter, createWebHashHistory} from "vue-router";
import LoginHome from "@/components/login/LoginHome.vue";
import HomePage from "@/components/home/HomePage.vue";
import ImageTable from "@/components/image/ImageTable.vue";
import UploadImage from "@/components/image/UploadImage.vue";

const routes = [
    {
        path: '/login',
        component: LoginHome,
    },
    {
        path: '/home',
        component: HomePage,
        children: [
            {
                path: '/image',
                component: ImageTable
            },
            {
                path: '/upload_image',
                component: UploadImage
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
        if (to.path === '/login') return next()
        const userName = window.sessionStorage.getItem('userName')
        if (!userName) return next('/login')
        next()
    }
)

export default router;
