<template>
  <div class="config">
    <div class="step-bar">
      <el-steps direction="vertical"
                :active="activeStep">
        <el-step title="选择方式"></el-step>
        <el-step title="参数配置"></el-step>
        <el-step title="编辑代码"></el-step>
        <el-step title="提交保存"></el-step>
        <!-- description="这是一段很长很长很长的描述性文字" -->
      </el-steps>
    </div>
    <div class="config-title">{{currentItem.title}}</div>
    <div class="config-container">

      <div class="choose-edit"
           v-if="currentItem.step===1">

        <el-radio v-model="radioValue"
                  label="0">公开</el-radio>
        <el-radio v-model="radioValue"
                  label="1">私密</el-radio>
      </div>

      <div v-if="currentItem.step===2">
        <el-form :inline="true"
                 :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-row>
            <el-col v-for="(Item,Index) in configList"
                    :key="Index"
                    :span="12">
              <el-form-item :label="Item.label"
                            :prop="Item.prop">
                <el-select v-if="Item.el==='select'"
                           v-model="ruleForm[Item.prop]"
                           :placeholder="Item.placeholder">
                  <el-option v-for="(item,index) in Item.options"
                             :key="index"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-select v-if="Item.el==='theme'"
                           v-model="ruleForm[Item.prop]"
                           :placeholder="Item.placeholder">
                  <el-option v-for="(item,index) in Item.options"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                    <el-popover placement="right"
                                trigger="hover">
                      <div><img style="width:20rem"
                             :src="`http://localhost:3000/images/${item.label}.png`"></div>
                      <div slot="reference">{{item.label}}</div>
                    </el-popover>
                  </el-option>

                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div v-if="currentItem.step===3">
        <div>
          <vueCode :code="code"
                   :readOnly="false"
                   @changeCode="changeCode"></vueCode>
        </div>
      </div>

      <div v-if="currentItem.step===4">
        <div>
          <el-form :model="uploadForm"
                   :rules="uploadRules"
                   ref="uploadForm"
                   label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="标题"
                          prop="codeTitle">
              <el-input v-model="uploadForm.codeTitle"></el-input>
            </el-form-item>
            <el-form-item label="描述"
                          prop="desc">
              <el-input type="textarea"
                        :rows="8"
                        v-model="uploadForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="代码类型"
                          prop="type">
              <el-select v-model="uploadForm.type"
                         placeholder="请选择代码类型">
                <el-option v-for="(item,index) in tagList"
                           :key="index"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图片上传"
                          prop="">
              <el-upload class="upload-demo"
                         action="http://localhost:8080/api/article/uploadImg"
                         :on-success="uploadSuccess"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :file-list="fileList"
                         list-type="picture">
                <el-button size="small"
                           type="primary">点击上传</el-button>
                <div slot="tip"
                     class="el-upload__tip">只能上传jpg/png文件</div>
              </el-upload>
              <!-- <el-upload ref="upload"
                         :on-success="handleUploadSuccess"
                         action="http://localhost:8080/api/article/uploadImg"
                         list-type="picture-card"
                         :auto-upload="false">
                <i slot="default"
                   class="el-icon-plus"></i>
                <div slot="file"
                     slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail"
                       :src="file.url"
                       alt="">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)">
                      <i class="el-icon-download"></i>
                    </span>
                    <span v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload> -->
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%"
                     :src="dialogImageUrl"
                     alt="">
              </el-dialog>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>

    <div class="bottom-btn">

      <el-button v-if="activeStep>0"
                 @click="prev"
                 size="medium">上一步</el-button>
      <el-button v-if="activeStep===1"
                 @click="setDefault"
                 size="medium">设为默认配置</el-button>
      <el-button v-if="activeStep===2"
                 @click="getDraft"
                 size="medium">获取未上传草稿</el-button>
      <el-button v-if="activeStep<3"
                 type="primary"
                 size="medium"
                 @click="next">下一步</el-button>
      <el-button v-if="activeStep===3"
                 type="primary"
                 size="medium"
                 @click="saveAll">保存</el-button>
    </div>
  </div>
</template>

<script>
// import Write from '../code/write'
import vueCode from '../../components/code/vueCodemirror'
import { submitCode, getTags } from '@/api/article'
import { updateDraft, getDraft } from '@/api/user'

export default {
  components: {
    // Write,
    vueCode
  },
  data () {
    const stepArr = [
      {
        step: 1,
        title: '选择发布方式'
      },
      {
        step: 2,
        title: '参数配置'
      },
      {
        step: 3,
        title: '编辑代码'
      },
      {
        step: 4,
        title: '提交保存'
      }
    ]
    return {
      // 用户信息
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // 步骤条当前项
      activeStep: 0,
      // 编辑方式
      radioValue: '0',
      // 当前序号
      stepNum: 0,
      step: stepArr,
      // 当前内容
      currentItem: stepArr[0],
      // 表单配置项
      configList: [
        {
          el: 'select',
          label: '模式',
          prop: 'mode',
          placeholder: '请选择模式',
          options: [
            {
              label: 'javascript',
              value: 'javascript'
            }
          ]
        },
        // {
        //   el: 'select',
        //   label: '换行符',
        //   prop: 'lineSeparator',
        //   placeholder: '请选择换行符',
        //   options: [
        //     {
        //       label: 'LF',
        //       value: '/LF'
        //     },
        //     {
        //       label: 'CRLF',
        //       value: '/CRLF'
        //     },
        //     {
        //       label: '',
        //       value: ''
        //     }
        //   ]
        // },
        {
          el: 'theme',
          label: '主题',
          prop: 'theme',
          placeholder: '请选择主题',
          options: [
            {
              label: 'ambiance',
              value: 'ambiance'
            },
            {
              label: 'base16-dark',
              value: 'base16-dark'
            },
            {
              label: 'base16-light',
              value: 'base16-light'
            }
            // {
            //   label: 'seti',
            //   value: 'seti'
            // },
            // {
            //   label: 'dracula',
            //   value: 'dracula'
            // }
          ]
        },
        {
          el: 'select',
          label: '缩进空格',
          prop: 'indentUnit',
          placeholder: '请选择缩进',
          options: [
            {
              label: '2',
              value: '2'
            },
            {
              label: '4',
              value: '4'
            }
          ]
        },
        {
          el: 'select',
          label: '显示行号',
          prop: 'lineNumbers',
          placeholder: '请选择是否显示行号',
          options: [
            {
              label: '是',
              value: true
            },
            {
              label: '否',
              value: false
            }
          ]
        },
        {
          el: 'select',
          label: '开始计数行',
          prop: 'firstLineNumber',
          placeholder: '请选择开始计数行',
          options: [
            {
              label: '1',
              value: '1'
            }
          ]
        },
        {
          el: 'select',
          label: '显示滚动条',
          prop: 'scrollbarStyle',
          placeholder: '请选择是否显示滚动条',
          options: [
            {
              label: '是',
              value: 'native'
            },
            {
              label: '否',
              value: 'null'
            }
          ]
        }
      ],
      // 配置表单数据
      ruleForm: JSON.parse(localStorage.getItem('defaltConfig')) || {
        mode: '',
        lineSeparator: '',
        theme: '',
        indentUnit: '',
        lineNumbers: '',
        firstLineNumber: '',
        scrollbarStyle: ''
      },
      // 表单验证规则
      rules: {
        mode: [
          { required: true, message: '请选择模式', trigger: 'change' }
        ],
        // lineSeparator: [
        //   { required: true, message: '请选择换行符', trigger: 'change' }
        // ],
        theme: [
          { required: true, message: '请选择主题', trigger: 'change' }
        ],
        indentUnit: [
          { required: true, message: '请选择缩进', trigger: 'change' }
        ],
        lineNumbers: [
          { required: true, message: '请选择是否显示行号', trigger: 'change' }
        ],
        firstLineNumber: [
          { required: true, message: '请选择开始计数行', trigger: 'change' }
        ],
        scrollbarStyle: [
          { required: true, message: '请选择是否显示滚动条', trigger: 'change' }
        ]
      },
      // 代码
      code: '',
      uploadForm: {
        codeTitle: '',
        desc: '',
        type: null
      },
      // 保存表单
      uploadRules: {
        codeTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择代码类型', trigger: 'change' }
        ]
      },
      // 图片上传参数
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // 参数
      query: this.$route.query || {},
      // 文件列表
      fileList: [],
      fileNameList: [],
      // 定时保存定时器
      timer: null
    }
  },
  created () {
    console.log(this.query, '777')
    getTags().then(res => {
      if (res.data.code === 200) {
        this.tagList = res.data.res
      } else {
        console.log('failed')
      }
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {

  },
  beforeDestroy () {
    this.updateDraft()
    clearInterval(this.timer)
  },
  methods: {
    // 保存草稿
    updateDraft () {
      updateDraft({ content: this.code, userId: this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          console.log('保存至草稿')
        } else {
          console.log('failed')
        }
        this.$ScreenLoading.hide()
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取草稿
    getDraft () {
      getDraft({ userId: this.userInfo.id }).then(res => {
        if (res.data.code === 200) {
          this.code = res.data.res[0].draft
        } else {
          console.log('failed')
        }
        this.$ScreenLoading.hide()
      }).catch(err => {
        console.log(err)
      })
    },
    // 上一步
    prev () {
      clearInterval(this.timer)
      this.activeStep -= 1
      this.stepNum -= 1
      this.currentItem = this.step[this.stepNum]
      if (this.stepNum === 2 && this.code !== '') {
        this.timer = setInterval(this.updateDraft, 5000)
      }
    },
    // 下一步
    next () {
      clearInterval(this.timer)
      if (this.stepNum === 1) { //! !!!!!!!!!!!!!!
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            localStorage.setItem('currentConfig', JSON.stringify(this.ruleForm))
            this.activeStep += 1
            this.stepNum += 1
            this.currentItem = this.step[this.stepNum]
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.activeStep += 1
        this.stepNum += 1
        this.currentItem = this.step[this.stepNum]
      }
      // 编辑代码stepNum为2
      console.log(this.stepNum, '222')
      if (this.stepNum === 2 && this.code !== '') {
        this.timer = setInterval(this.updateDraft, 5000)
      }
    },
    // 默认编号设置
    setDefault () {
      localStorage.setItem('defaltConfig', JSON.stringify(this.ruleForm))
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 编辑代码
    changeCode (val) {
      this.code = val
      clearInterval(this.timer)
      if (this.stepNum === 2 && this.code !== '') {
        this.timer = setInterval(this.updateDraft, 5000)
      }
    },
    // 图片上传相关
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },
    submitUpload () {
      // this.$refs.upload.submit()
    },
    // 提交代码
    save (imgName, imgList) {
      // this.$ScreenLoading.show('加载中...', 'top')
      const params = {
        title: this.uploadForm.codeTitle,
        desc: this.uploadForm.desc,
        type: parseInt(this.uploadForm.type),
        authorId: this.userInfo.id,
        authorName: this.userInfo.name,
        createTime: new Date(),
        content: this.code,
        imgName: imgName,
        imgList: JSON.stringify(imgList),
        private: parseInt(this.radioValue)
      }
      submitCode({ ...params, ...this.query }).then(res => {
        if (res.data.code === 200) {
          this.$store.commit('changeTagId', 0)
          if (this.query.teamId) {
            this.$router.push(`/teamDetail?teamId=${this.query.teamId}`)
          } else {
            this.$router.push('/index')
          }
        } else {
          console.log('failed')
        }
        this.$ScreenLoading.hide()
      }).catch(err => {
        console.log(err)
      })
    },
    // 提交保存All
    saveAll () {
      this.$refs.uploadForm.validate((valid) => {
        if (valid) {
          // this.submitUpload()
          this.save(this.fileNameList[0], this.fileNameList)
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.submitUpload()
    },
    // 上传成功回调
    handleUploadSuccess (item) {
      this.save(item.filename)
    },

    handlePreview () {

    },
    // 移除图片回调
    handleRemove (item) {
      console.log(item.response.filename, '移除图片')
      const name = item.response.filename
      const index = this.fileNameList.indexOf(name)
      this.fileNameList.splice(index, 1)
    },
    uploadSuccess (item) {
      this.fileNameList.push(item.filename)
      console.log(this.fileNameList, '222')
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  text-align: left;
}
.step-bar {
  position: absolute;
  left: 12rem;
  top: 9rem;
  height: 30rem;
  max-width: 9rem;
}
.config-container {
  min-height: 30rem;
  position: relative;
  // display: flex;
  align-items: center;
  justify-content: center;
}
.config-title {
  margin: 0 0 1rem 0;
  text-align: center;
}
.CodeMirror-scroll {
  width: 20rem;
}
.choose-edit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.bottom-btn {
  margin-top: 1rem;
  text-align: center;
}
// ::v-deep .el-form-item__content .div {
//   background: black;
//   text-align: left;
// }
// ::v-deep .el-upload--picture-card {
//   float: left;
// }
// ::v-deep .el-upload-list--picture-card .el-upload-list__item-actions {
//   float: left;
// }
</style>
