<!--<template>-->
<!--    <el-form :model="form" label-width="120px">-->
<!--        <el-form-item label="上传照片">-->
<!--            <template>-->
<!--                <el-upload-->
<!--                    v-model:file-list="fileList"-->
<!--                    class="uploadImage"-->
<!--                    action="none"-->
<!--                    :on-preview="handlePreview"-->
<!--                    :on-remove="handleRemove"-->
<!--                    :on-change="checkType"-->
<!--                    :auto-upload="false"-->
<!--                    ref="upload"-->
<!--                >-->
<!--&lt;!&ndash;                    <el-button type="primary">Click to upload</el-button>&ndash;&gt;-->
<!--                    <el-button class="btn"><i class="el-icon-paperclip"></i>上传附件</el-button>-->
<!--                </el-upload>-->
<!--            </template>-->
<!--            <template>-->
<!--                <el-image style="width: 100px; height: 100px" :src="imageUrl" :fit="'fill'" />-->
<!--            </template>-->
<!--&lt;!&ndash;            <el-input v-model="form.name" />&ndash;&gt;-->
<!--        </el-form-item>-->

<!--        <el-form-item label="描述">-->
<!--            <el-input v-model="form.desc" type="textarea" />-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--            <el-button type="primary" @click="onSubmit">上传</el-button>-->
<!--        </el-form-item>-->
<!--    </el-form>-->
<!--</template>-->

<!--<script >-->
<!--export default {-->
<!--    data(){-->
<!--        return{-->
<!--            imageUrl:"",-->
<!--            form : {-->
<!--                ImageFIle: null,-->
<!--                desc: '',-->
<!--            },-->
<!--            fileList:[],-->
<!--            handleRemove : (uploadFile, uploadFiles) => {-->
<!--                console.log(uploadFile, uploadFiles)-->
<!--            },-->
<!--            handlePreview : (file) => {-->
<!--                console.log(file)-->
<!--            },-->
<!--            checkType:(file,fileList)=>{-->
<!--                // eslint-disable-next-line no-unused-vars-->
<!--                fileList=[];-->
<!--                this.form.ImageFIle=file-->
<!--                this.imageUrl=URL.createObjectURL(file.raw)-->
<!--            }-->
<!--        }-->
<!--    },-->
<!--    methods:{-->
<!--        onSubmit(){-->
<!--            console.log('submit!')-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->

<template>
    <el-upload
            ref="upload"
            :auto-upload="false"
            :file-list="fileList"
            :headers="headers"
            :limit="5"
            :on-change="handleChange"
            :on-exceed="limitCheck"
            :on-remove="removeFile"
            accept=".png,.jpg,.jpeg,.doc,.docx,.txt,.xls,.xlsx"
            action="#"
            list-type="picture-card"
            multiple
    >
        <el-button size="small" type="primary">点击上传图片</el-button>
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
            },
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
        }
    }

}
</script>