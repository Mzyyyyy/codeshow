<template>
  <div class="personal-center">
    <h2>个人资料</h2>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="头像"
                    prop="avator">
        <el-upload ref="upload"
                   class="avatar-uploader"
                   :limit="1"
                   :on-success="handleUploadSuccess"
                   :before-upload="beforeAvatarUpload"
                   action="http://localhost:8080/api/article/uploadImg"
                   :show-file-list="false"
                   :auto-upload="true"
                   :disabled="!isEdit">
          <img v-if="imageUrl"
               :src="`http://localhost:3000/images/${imageUrl}`"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名"
                    prop="name">
        <el-input type="text"
                  placeholder="请输入用户名"
                  v-model="ruleForm.name"
                  maxlength="10"
                  :disabled="!isEdit"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="简介"
                    prop="desc">
        <el-input type="textarea"
                  :disabled="!isEdit"
                  placeholder="请输入简介"
                  v-model="ruleForm.desc"
                  :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="账号"
                    prop="account">
        <el-input placeholder="请输入账号"
                  :disabled="!isEdit"
                  v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input placeholder="请输入密码"
                  type="password"
                  :disabled="!isEdit"
                  v-model="ruleForm.password"></el-input>
      </el-form-item>
    </el-form>
    <div class="bottom-btn">
      <el-button v-if="!isEdit"
                 @click="edit">编辑</el-button>
      <el-button v-if="isEdit"
                 type="primary"
                 @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from '@/api/user'

export default {
  components: {

  },
  data () {
    return {
      ruleForm: {
        name: '',
        desc: '',
        account: '',
        password: '',
        avatorName: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入简介', trigger: 'blur' }
          // { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 0, max: 15, message: '长度在 0 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 15, message: '长度在 0 到 15 个字符', trigger: 'blur' }
        ]
      },
      // 用户登录信息
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // 用户详细信息
      userDetail: null,
      // 头像url
      imageUrl: 'default.png',
      // 是否正在编辑
      isEdit: false
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      // this.$ScreenLoading.show('加载中...', 'top')
      getUserInfo({ id: this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          this.userDetail = res.data.res
          this.ruleForm.name = this.userDetail.name
          this.ruleForm.desc = this.userDetail.desc
          this.ruleForm.account = this.userDetail.account
          this.ruleForm.password = this.userDetail.password
          this.ruleForm.avatorName = `${this.userDetail.avator}`
          this.imageUrl = this.userDetail.avator
        } else {
          console.log('failed')
        }
        this.$ScreenLoading.hide()
      }).catch(err => {
        console.log(err)
      })
    },
    // 上传头像
    submitUpload () {
      this.$refs.upload.submit()
    },
    // 上传成功回调
    handleUploadSuccess (res, file) {
      this.ruleForm.avatorName = res.filename
      this.imageUrl = res.filename
    },
    // 上传限制
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 开始编辑
    edit () {
      this.isEdit = true
    },
    // 保存编辑信息
    save () {
      // this.$ScreenLoading.show('加载中...', 'top')
      const params = {
        id: this.userInfo.id
        // name: this.ruleForm.name,
        // desc: this.ruleForm.desc,
        // account: this.ruleForm.account,
        // password: this.ruleForm.password,
        // avatorName: this.ruleForm.avatorName
      }
      updateUserInfo(Object.assign(this.ruleForm, params)).then(res => {
        if (res.data.code === 200) {
          this.isEdit = false
          this.userInfo.avator = this.imageUrl
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        } else {
          console.log('failed')
        }
        this.$ScreenLoading.hide()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped >
.personal-center {
  padding: 2rem;
  text-align: left;
  h2 {
    margin: 2rem 0;
  }
  ::v-deep .el-form-item__label {
    text-align: left;
  }
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
  .bottom-btn {
    text-align: center;
  }
}
</style>
