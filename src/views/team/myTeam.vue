<template>
  <div class="team">
    <div class="menu-box">
      <Menu :menuList="menuList"></Menu>
    </div>
    <div class="team-title">
      <div :class="tabId===0?'title-text title-active':'title-text'"
           @click="chooseTeam(0)">我参与的</div>
      <div :class="tabId===1?'title-text title-active':'title-text'"
           @click="chooseTeam(1)">我创建的</div>
    </div>
    <div>
      <div class="team-item"
           v-for="(item,index) in tabId===0?myInList:myCreateList"
           :key="index">
        <div>
          <el-image style="width: 8rem; height: 8rem"
                    :src="`http://localhost:3000/images/${item.img}`"
                    fit="cover">
            <div slot="error"
                 class="image-slot">
              <!-- <i class="el-icon-picture-outline"></i> -->
            </div>
          </el-image>
        </div>
        <div class="team-item-content">
          <div class="team-item-title">{{item.name}}</div>
          <div class="team-item-desc">{{item.desc}}</div>
        </div>
        <div class="team-item-btn">
          <div>
            <div style="margin-bottom:1rem">
              <el-button type="primary"
                         size="medium"
                         @click="goDetail(item)">查看详情</el-button>
            </div>
            <div>
              <el-button v-if="tabId===0"
                         type="danger"
                         size="medium"
                         @click="quit(item)">退出团队</el-button>
              <el-button v-if="tabId===1"
                         type="danger"
                         size="medium"
                         @click="del(item)">解散团队</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-dialog title="创建团队"
                 :visible.sync="dialogFormVisible">
        <el-form :model="form"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-form-inline">
          <el-form-item label="团队名称"
                        prop="name">
            <el-input v-model="form.name"
                      placeholder="请输入团队名称"></el-input>
          </el-form-item>
          <el-form-item label="团队描述"
                        prop="desc">
            <el-input type="textarea"
                      :rows="5"
                      placeholder="请输入团队描述"
                      v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="图像"
                        prop="avator">
            <el-upload ref="upload"
                       class="avatar-uploader"
                       :limit="1"
                       :on-success="handleUploadSuccess"
                       :before-upload="beforeAvatarUpload"
                       action="http://localhost:8080/api/article/uploadImg"
                       :show-file-list="false"
                       :auto-upload="true">
              <img v-if="form.imageUrl"
                   :src="`http://localhost:3000/images/${form.imageUrl}`"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="createTeam">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/dashboard/Menu'
import { createTeam, getTeamList, quitTeam, deleteTeam } from '@/api/team'

export default {
  components: {
    Menu
  },
  data () {
    return {
      // 团队标签
      tabId: 0,
      // 团队列表
      teamList: [

      ],
      // 我参加的
      myInList: [],
      // 我创建的
      myCreateList: [],
      // 按钮
      menuList: [
        {
          icon: 'el-icon-star-off',
          text: '创建团队',
          func: this.showCreate
        }
      ],
      // 显示弹出框
      dialogFormVisible: false,
      // 创建团队表单信息
      form: {
        name: '',
        desc: '',
        imageUrl: null,
        img: null
      },
      rules: {
        name: [
          { required: true, message: '请输入团队名称', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写团队描述', trigger: 'blur' }
        ]
      },
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
    }
  },
  created () {
    // this.teamList = this.myInList
    this.getTeamList()
  },
  methods: {
    // 选择团队标签
    chooseTeam (num) {
      this.tabId = num
      if (num === 0) {
        this.teamList = this.myInList
      } else {
        this.teamList = this.myCreateList
      }
    },
    // 显示创建团队
    showCreate () {
      this.form.name = ''
      this.form.desc = ''
      this.form.img = null
      this.form.imgUrl = null
      this.dialogFormVisible = true
    },
    // 上传成功回调
    handleUploadSuccess (res, file) {
      this.form.img = res.filename
      this.form.imageUrl = res.filename
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
    // 查询团队列表
    // getTeamListCreated () {
    //   getTeamList({ id: this.userInfo.id }).then(res => {
    //     if (res.data.code === 200) {
    //       this.myCreateList = res.data.res.myOwn
    //       this.myInList = res.data.res.myIn
    //       this.teamList = this.myInList
    //     } else {
    //       console.log('failed')
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    getTeamList () {
      // this.$ScreenLoading.show('加载中...', 'top')
      getTeamList({ id: this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          this.myCreateList = res.data.res.myOwn
          this.myInList = res.data.res.myIn
        } else {
          console.log('failed')
        }
        this.$ScreenLoading.hide()
      }).catch(err => {
        console.log(err)
      })
    },
    // 创建团队
    createTeam () {
      const params = {
        name: this.form.name,
        desc: this.form.desc,
        ownerId: this.userInfo.id,
        ownerName: this.userInfo.name,
        img: this.form.img
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          createTeam(params).then(res => {
            if (res.data.code === 200) {
              this.dialogFormVisible = false
              this.getTeamList()
              console.log(res.data.res)
            } else {
              console.log('failed')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 退出团队
    quit (item) {
      quitTeam({ teamId: item.id, memberId: this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          this.getTeamList()
          console.log(res.data.res)
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 解散团队
    del (item) {
      deleteTeam({ teamId: item.id }).then(res => {
        if (res.data.code === 200) {
          this.getTeamList()
          console.log(res.data.res)
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看详情
    goDetail (item) {
      this.$router.push({ path: '/teamDetail', query: { teamId: item.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";

.team-title {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.title-text {
  margin: 0 0.5rem;
  padding: 0.5rem 0;
  cursor: pointer;
}
.title-active {
  color: #00bcd4;
  border-bottom: 2px solid #00bcd4;
}
.team-item {
  display: flex;
  margin: 1rem 0;
  .team-item-content {
    flex: 1;
    text-align: left;
    padding: 1rem;
  }
  .team-item-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12rem;
  }
  .team-item-title {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0.5rem 0 0.3rem 0;
  }
  .team-item-desc {
    color: gray;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding-right: 1rem;
  }
}
.menu-box {
  position: absolute;
  left: 12rem;
  top: 8rem;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: left;
}
::v-deep .avatar-uploader {
  text-align: left;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #00bcd4;
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
</style>
