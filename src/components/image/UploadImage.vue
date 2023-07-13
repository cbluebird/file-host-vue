<template>
    <el-scrollbar max-height="400px">
    <el-upload
        ref="upload"
        accept=".png,.jpg,.jpeg,.doc,.docx,.txt,.xls,.xlsx"
        action="#"
        multiple
        :limit="5"
        :headers="headers"
        :auto-upload="false"
        :file-list="fileList"
        :on-change="handleChange"
        :on-preview="handlePictureCardPreview"
        :on-remove="removeFile"
        :on-exceed="limitCheck"
        list-type="picture-card"
    >

        <el-button  type="primary">点击上传图片</el-button>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <p></p>
    <el-button type="primary" @click="confirm">
        上传到服务器<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
    </el-scrollbar>
</template>

<script>
import {Upload} from "@element-plus/icons-vue";

export default {
    components: {Upload},
    data() {
        return {
            // 上传附件
            fileList: [],
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            dialogImageUrl : '',
            dialogVisible : false
        }
    },
    methods: {

        // 文件状态改变时的钩子
        handleChange(file, fileList) { // 文件数量改变
            this.fileList = fileList
            const isLt2M = (file.size / 1024 / 1024 < 2)
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
                this.fileList.pop()
            }
            return isLt2M
        },
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
            this.fileList.forEach((val) => {
                param.append('img', val.raw)
            })
            // 拿取其他的信息

            this.axios(`/api/image/upload_img`, {
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
        handlePictureCardPreview(uploadFile) {
            this.dialogImageUrl.value = uploadFile.url
            this.dialogVisible.value = true
        }
    }
}
</script>