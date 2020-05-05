<template>
  <div class="team-detail">
    <div class="section-box">
      <!-- <div style="padding:1rem 0;border-bottom: 1px solid rgba(187, 187, 187, 0.3);color:#00bcd4">内容目录</div> -->
      <div v-for="(item,index) in sectionList"
           :key="index"
           @click="chooseSection(item)"
           :class="currentId===item.id?'section-active':'section-item'">
        {{item.name}}
        <i v-if="currentId===item.id"
           class="el-icon-arrow-right"></i>
      </div>
      <div v-if="isOwner"
           class="section-add">
        <i class="el-icon-circle-plus"
           @click="showAdd"></i>
      </div>
    </div>

    <div v-if="currentId"
         class="right-btn">
      <div>
        <el-button @click="goSubmit">前往提交</el-button>
      </div>
      <div style="margin-top:1rem">
        <el-button @click="goMySubmit">我的提交</el-button>
      </div>

    </div>

    <div v-if="!currentId">
      <div>
        <el-image v-if="teamDetail.img"
                  style="width: 8rem; height: 8rem"
                  :src="teamDetail.img?`http://localhost:3000/images/${teamDetail.img}`:null"
                  fit="cover">

        </el-image>
      </div>
      <div class="team-name">
        {{teamDetail.name}}
      </div>
      <div class="team-desc">
        {{teamDetail.desc}}
      </div>
      <div v-if="isOwner"
           class="member-box">
        <div class="team-text">添加成员</div>
        <div style="max-width:20rem;margin:0 0 2rem 2rem">
          <el-input placeholder="请搜索用户id或用户名"
                    v-model="searchValue"
                    class="input-with-select">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="searchUser"></el-button>
          </el-input>
        </div>
        <div v-if="searchList.length>0">
          <el-row>
            <el-col v-for="(Item,Index) in searchList"
                    style="display:flex;align-items:center;justify-content:center"
                    :key="Index"
                    :span="6">
              <div class="member-item">
                <el-avatar size="large"
                           style="width:5rem;height:5rem"
                           :src="`http://localhost:3000/images/${Item.avator}`"></el-avatar>
                <div>{{Item.name}}
                  <i v-if="Item.isMember&&isOwner"
                     class="el-icon-remove user-add"
                     @click="addMember(Item)"></i>
                  <i v-if="!Item.isMember&&isOwner"
                     class="el-icon-circle-plus user-add"
                     @click="addMember(Item)"></i>
                </div>
              </div>

            </el-col>
          </el-row>
        </div>
        <div v-if="showTip"
             class="team-tip">未找到该用户</div>
      </div>
      <div class="member-box">
        <div class="team-text">团队成员({{memberList.length}})</div>
        <el-row>
          <el-col v-for="(Item,Index) in memberList"
                  style="display:flex;align-items:center;justify-content:center"
                  :key="Index"
                  :span="6">
            <div class="member-item">
              <el-avatar size="large"
                         style="width:5rem;height:5rem"
                         :src="`http://localhost:3000/images/${Item.avator}`"></el-avatar>
              <div>{{Item.name}}
                <i v-if="isOwner"
                   class="el-icon-remove user-add"
                   @click="addMember(Item)"></i>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>
    </div>

    <div v-if="currentId">
      <div class="member-box">
        <div class="team-text">已提交成员({{currentSection.submitted.length}}/{{memberList.length}})</div>
        <el-row>
          <el-col v-for="(Item,Index) in submitList"
                  style="display:flex;align-items:center;justify-content:center"
                  :key="Index"
                  :span="6">
            <div class="member-item">
              <el-avatar size="large"
                         style="width:5rem;height:5rem"
                         :src="`http://localhost:3000/images/${Item.avator}`"></el-avatar>
              <div>
                {{Item.name}}
              </div>
              <div>
                <el-button v-if="isOwner"
                           size="small"
                           @click="goRead(Item)">查看</el-button>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog title="新增章节"
               :visible.sync="dialogVisible">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="章节名称"
                      prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="desc">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSection">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTeamDetail, addUserInTeam, getSectionList, addSectionToTeam } from '@/api/team'
import { getUsersByIds, searchUser } from '@/api/user'
import { getArticleByTeam } from '@/api/article'

export default {
  components: {

  },
  created () {
    this.getTeamDetail()
  },
  data () {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // 当前团队ID
      teamId: this.$route.query.teamId || null,
      // 当前团队详情
      teamDetail: {},
      // 成员列表
      memberList: [],
      // 查找用户值
      searchValue: '',
      // 搜索结果列表
      searchList: [],
      // 是否显示搜索结果提示
      showTip: false,
      // 是否是团队所有者
      isOwner: false,
      // 章节列表
      sectionList: [
        {
          id: 1,
          name: '链表'
        },
        {
          id: 2,
          name: '队列'
        }
      ],
      // 当前章节id
      currentId: null,
      currentSection: null,
      // 新增弹框显示
      dialogVisible: false,
      ruleForm: {
        name: '',
        title: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入章节名称', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: false, message: '请输入描述', trigger: 'blur' }
        ]
      },
      // 提交成员列表
      submitList: []
    }
  },
  methods: {
    // 获取团队详情
    getTeamDetail () {
      getTeamDetail({ teamId: this.teamId }).then(res => {
        if (res.data.code === 200) {
          this.teamDetail = res.data.res
          this.getSectionList()
          this.isOwner = parseInt(this.teamDetail.ownerId) === parseInt(this.userInfo.id)
          getUsersByIds({ ids: JSON.parse(this.teamDetail.members) }).then(res => {
            if (res.data.code === 200) {
              this.memberList = res.data.res
            } else {
              console.log('failed')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 搜索用户
    searchUser () {
      if (this.searchValue) {
        searchUser({ keyword: this.searchValue }).then(res => {
          if (res.data.code === 200) {
            this.searchList = res.data.res
            this.searchList.map(Item => {
              var temp = this.memberList.some(item => {
                if (item.id === Item.id) {
                  return true
                }
              })
              if (temp) {
                Item.isMember = true
              } else {
                Item.isMember = false
              }
            })
            if (this.searchList.length === 0) {
              this.showTip = true
            } else {
              this.showTip = false
            }
          } else {
            console.log('failed')
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.showTip = false
      }
    },
    // 添加团队成员
    addMember (item) {
      item.isMember = !item.isMember
      addUserInTeam({ userId: item.id, teamId: this.teamId }).then(res => {
        if (res.data.code === 200) {
          this.getTeamDetail()
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择章节
    chooseSection (item) {
      if (this.currentId === item.id) {
        this.currentId = null
        this.currentSection = { submitted: [] }
      } else {
        this.currentId = item.id
        this.currentSection = item
      }
      // this.currentId ? this.currentId = null : this.currentId = item.id
      // this.currentSection ? this.currentSection = null : this.currentSection = item
      getUsersByIds({ ids: this.currentSection.submitted }).then(res => {
        if (res.data.code === 200) {
          this.submitList = res.data.res
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 新增章节弹框
    showAdd () {
      this.dialogVisible = true
    },
    // 新增章节
    addSection () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addSectionToTeam()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取章节列表
    getSectionList () {
      getSectionList({ teamId: this.teamId }).then(res => {
        if (res.data.code === 200) {
          this.sectionList = res.data.res
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取章节列表
    addSectionToTeam () {
      addSectionToTeam({ teamId: this.teamId, ...this.ruleForm }).then(res => {
        if (res.data.code === 200) {
          this.getSectionList()
          this.sectionList = res.data.res
          this.dialogVisible = false
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看提交文章详情
    goRead (item) {
      console.log(item, 333)
      getArticleByTeam({ authorId: item.id, teamId: this.teamId, sectionId: this.currentId }).then(res => {
        if (res.data.code === 200) {
          this.$router.push({ path: '/read', query: { articleId: res.data.res.id, teamId: this.teamId, sectionId: this.currentId } })
        } else {
          console.log('failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 前往提交页面
    goSubmit () {
      // this.$router.push('/config')
      this.$router.push({ path: '/config', query: { teamId: this.teamId, sectionId: this.currentId } })
    },
    // 查看我的提交
    goMySubmit () {

    }
  }
}
</script>

<style lang="scss" scoped>
.team-detail {
  padding: 2rem;
  .team-name {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0.5rem 0 0.3rem 0;
  }
  .team-desc {
    color: gray;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .member-box {
    margin: 2rem 0 0 0;
    // max-height: 30rem;
    // overflow-y: scroll;
  }
  .member-item {
    cursor: pointer;
    margin-bottom: 2rem;
  }
  .team-text {
    text-align: left;
    margin: 0 0 2rem 2rem;
  }
  .team-tip {
    color: gray;
    text-align: left;
    margin-left: 2rem;
  }
  .user-add {
    color: #f56c6c;
    margin-left: 1rem;
  }
  .section-box {
    position: fixed;
    left: 2rem;
    top: 5rem;
    background: white;
    width: 16rem;
    height: calc(100vh - 14rem);
    overflow-y: scroll;
    .section-item,
    .section-active {
      margin: 0 1rem;
      // text-align: left;
      cursor: pointer;
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(187, 187, 187, 0.3);
    }
    .section-item:hover {
      color: #00bcd4;
    }
    .section-active {
      color: #00bcd4;
    }
  }
  .section-add {
    position: fixed;
    bottom: 4rem;
    left: 8.5rem;
    font-size: 3rem;
    color: #00bcd4;
    cursor: pointer;
  }
  .right-btn {
    position: fixed;
    top: 6rem;
    right: 12rem;
  }
}
</style>
