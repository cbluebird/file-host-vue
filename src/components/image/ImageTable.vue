<template>
    <el-table :data="dataList">
        <el-table-column align="center" label="图片编号" prop="id" width="200"/>
        <el-table-column align="center" label="照片名称" prop="name" width="200"/>
        <el-table-column align="center" label="创建时间" prop="date" width="200"/>
        <el-table-column align="center" label="引用路径" prop="path" width="200"/>
        <el-table-column align="center" label="图片" prop="image" width="200">
            <template #default="scope">
                <el-image
                        :preview-src-list="pList=[scope.row.image]"
                        :preview-teleported="true"
                        :src="scope.row.image"
                        :zoom-rate="1.2"
                        fit="cover"
                        style="width: 100px; height: 100px"
                />
            </template>
        </el-table-column>
        <!--        <el-table-column label="描述" prop="des" align="center" width="300"/>-->
        <el-table-column align="center" label="操作" width="200">
            <template #default="scope">
                <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row.id)"
                >删除
                </el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
            :current-page="queryInfo.page_num"
            :page-size="queryInfo.page_size"
            :total="total"
            layout="prev, pager, next, jumper"
            @current-change="handleCurrentChange"
    >
    </el-pagination>
</template>

<script>
export default {
    data() {
        return {
            payload: {
                id: 0,
            },
            dataList: [],
            pList: [],
            queryInfo: {
                page_num: 1,
                page_size: 2
            },
            total: 4
        }
    },

    created() {
        this.getData()
    },

    methods: {
        async handleDelete(index) {
            this.payload.id = index
            const {data: res} = await this.axios.post('/api/image/delete', this.payload)
            console.log(res)
            if (res.code !== 200) {
                alert("删除失败")
            }
            await this.getData()
        },

        async getData() {
            const {data: res} = await this.axios.get(
                '/api/image/get', {
                    params: this.queryInfo
                })
            console.log(res)
            this.dataList = res.data.list
            this.total = res.data.total
        },

        async handleCurrentChange(newPage) {
            this.queryInfo.page_num = newPage
            await this.getData()
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