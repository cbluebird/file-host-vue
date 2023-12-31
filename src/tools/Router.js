import {createRouter,createWebHashHistory} from "vue-router";
import LoginHome from "@/components/login/LoginHome.vue";
import HomePage from "@/components/home/HomePage.vue";
import ImageTable from "@/components/image/ImageTable.vue";
import UploadImage from "@/components/image/UploadImage.vue";
import FileTable from "@/components/file/FileTable.vue";
import UploadFile from "@/components/file/UploadFile.vue";

const routes = [
    {
        path:'/login',
        component:LoginHome,
    },
    {
        path:'/home',
        component:HomePage,
        children:[
            {
                path:'/image',
                component:ImageTable
            },
            {
                path:'/upload_image',
                component:UploadImage
            },
            {
                path: '/file',
                component: FileTable
            },
            {
                path: '/file_upload',
                component: UploadFile
            }
        ]
    }
]

const router =createRouter({
    history:createWebHashHistory(),
    routes,
})

router.beforeEach((to,from,next)=> {
        if (to.path === '/login') return next()
        const userName=window.sessionStorage.getItem('userName')
        if(!userName)return next('/login')
        next()
    }
)

export default router;
