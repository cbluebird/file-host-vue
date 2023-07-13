<template>
    <el-table :data="dataList">
        <el-table-column label="照片名称" prop="name" align="center" width="200"/>
        <el-table-column label="创建时间" prop="date" align="center" width="200"/>
        <el-table-column label="引用路径" prop="src" align="center" width="200"/>
        <el-table-column label="图片"    prop="src" align="center" width="200">
            <template  #default="scope">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.src"
                    :zoom-rate="1.2"
                    :preview-src-list="pList=[scope.row.src]"
                    :preview-teleported="true"
                    fit="cover"
                />
            </template>
        </el-table-column>
<!--        <el-table-column label="描述" prop="des" align="center" width="300"/>-->
        <el-table-column label="删除" align="center" width="100">
            <template #default="scope">
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row.id)"
                >删除</el-button
                >
            </template>
        </el-table-column>
        <el-table-column label="下载" align="center" width="100">
            <template #default="scope">
                <el-button
                    size="small"
                    type="danger"
                    @click="download(scope.row.id)"
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
                '/api/image/get',{
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
            let url=axios.defaults.baseURL+"/api/image/download/"+filename
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