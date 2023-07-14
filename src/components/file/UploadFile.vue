<template>
    <el-upload
        ref="upload"
        class="upload-demo"
        :file-list="fileList"
        action="#"
        :limit="5"
        :on-change="handleChange"
        :on-remove="removeFile"
        :on-exceed="limitCheck"
        :auto-upload="false"
    >
        <template #trigger>
            <el-button type="primary">选择文件</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="confirm">
            上传到服务器
        </el-button>
        <template #tip>
            <div class="el-upload__tip text-red">
                limit 5 file, new file will cover the old file
            </div>
        </template>
    </el-upload>
</template>

<script>
export default {
    data() {
        return {
            // 上传附件
            fileList: [],
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    },
    methods: {
        handleChange(file, fileList) { // 文件数量改变
            this.fileList = fileList
        },
        // 文件状态改变时的钩子
        // 文件超出个数限制时的钩子
        limitCheck() {
            this.$message.warning('每次上传限制最多五个文件')
        },
        // 文件删除的钩子
        removeFile(file, fileList) {
            this.fileList = fileList
        },
        // 点击确定按钮 上传文件
        confirm() {
            var param = new FormData()
            console.log(this.fileList)
            this.fileList.forEach((val) => {
                param.append('file', val.raw)
            })
            // 拿取其他的信息

            this.axios(`/api/file/upload`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                method: 'post',
                data: param
            }).then((res) => {
                if (res.data.code === 200) {
                    this.$message.success('上传成功')
                } else {
                    this.$message.error('上传失败')
                }
            })
        },
    }
}
</script>