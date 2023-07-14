<template>
    <el-table :data="dataList">
        <el-table-column label="文件名称" prop="name" align="center" width="200"/>
        <el-table-column label="创建时间" prop="date" align="center" width="200"/>
        <el-table-column label="类型" prop="type" align="center" width="200"/>
        <el-table-column label="文件大小" prop="size" align="center" width="200"/>
        <el-table-column label="删除" align="center" width="100">
            <template #default="scope">
                <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row.uuid)"
                >删除</el-button
                >
            </template>
        </el-table-column>
        <el-table-column label="下载" align="center" width="100">
            <template #default="scope">
                <el-button
                        size="small"
                        type="danger"
                        @click="download(scope.row.uuid)"
                >下载</el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
            @current-change="handleCurrentChange"
            :current-page="queryInfo.page_num"
            :page-size="queryInfo.page_size"
            layout="prev, pager, next, jumper"
            :total="total"
    >
    </el-pagination>
</template>

<script>
import { saveAs } from 'file-saver'
import axios from "axios";

export default {
    data(){
        return{
            payload:{
                id: 0,
            },
            dataList:[],
            pList:[],
            queryInfo:{
                page_num:1,
                page_size:2
            },
            downloadInfo:{
                file_name:''
            },
            total:4
        }
    },

    created() {
        this.getData()
    },

    methods:{
        async handleDelete  (id)  {
            this.payload.id=id
            const {data:res} = await this.axios.post('/api/image/delete',this.payload)
            console.log(res)
            if(res.code !== 200){
                alert("删除失败")
            }
            await this.getData()
        },

        async getData(){
            const {data:res}= await this.axios.get(
                '/api/file/get',{
                    params:this.queryInfo
                })
            this.dataList=res.data.list
            this.total=res.data.total
        },

        async handleCurrentChange(newPage){
            this.queryInfo.page_num=newPage
            await this.getData()
        },

        async download(filename=''){
            let url=axios.defaults.baseURL+"/api/file/download/"+filename
            saveAs(url, filename)
        }
    }
}

</script>

<style scoped>
.demo-image__error .image-slot {
    font-size: 10px;
}
.demo-image__error .image-slot .el-icon {
    font-size: 10px;
}
.demo-image__error .el-image {
    width: 100%;
    height: 400px;
}
</style>