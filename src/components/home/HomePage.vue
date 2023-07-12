<template>
    <el-container class="main-container">
        <!--头部区域-->
        <el-header>
            <div>
                <span>文件图片管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!--左侧侧边栏-->
            <el-aside width="100px">
                <el-menu active-text-color="#409EFF" background-color="#545c64" router text-color="#fff">
                    <el-menu-item index="modify">
                        <i class="el-icon-setting"></i>
                        <slot name="title">修改密码</slot>
                    </el-menu-item>
                    <el-menu-item index="image">
                        <i class="el-icon-s-comment"></i>
                        <slot name="title">图片管理</slot>
                    </el-menu-item>
                    <el-menu-item index="upload_image">
                        <i class="el-icon-s-comment"></i>
                        <slot name="title">上传图片</slot>
                    </el-menu-item>
                    <el-menu-item index="research">
                        <i class="el-icon-zoom-in"></i>
                        <slot name="title">文件管理</slot>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!--右侧主题区域-->
            <el-main>
                <router-view>

                </router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>

import router from "@/tools/router";

export default {
//created(){
    //this.getMenuList()
//},
    methods: {
        logout() {
            router.push('/login')
            //清除session
            window.sessionStorage.clear()
        },

    }
}
</script>

<style scoped>
.main-container {
    height: 100vh;
    /*vh为相对与视窗的高度，视窗被分为100单位的vh，同理还有相对于视窗的宽度vw，height：100%当元素没有内容的时候不会被撑开*/
}

.el-header {
    background-color: #373d41;
    display: flex; /*flex弹性布局，一般用于垂直居中布局 */
    justify-content: space-between; /*justify-content是水平布局，详见css3中justify-content属性的教程 */
    align-items: center; /*与justify-content相对应，为垂直布局 */
    color: #fff;
    font-size: 30px;
}

.el-aside {
    background-color: #333744;
}

.el-main {
    background-color: #eaedf1;
}


</style>