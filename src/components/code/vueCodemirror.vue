<template>
  <div>
    <codemirror ref="mycode"
                v-model="curCode"
                :options="cmOptions"
                class="code">
    </codemirror>
    <!-- <div class="save-btn"
         @click="show">button</div> -->
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
// 主题引入
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/seti.css'

// 引入模式js
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/vue/vue')
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')

export default {
  components: {
    codemirror
  },
  props: {
    code: {
      type: String,
      required: true
    },
    readOnly: {
      type: Boolean,
      required: true
    }
  },
  data () {
    const optionsConfig = JSON.parse(localStorage.getItem('currentConfig')) || JSON.parse(localStorage.getItem('defaltConfig'))
    return {
      curCode: '',
      cmOptions: Object.assign({
        // mode: 'text/javascript', // 选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
        value: '',
        mode: 'text/javascript', // 模式
        theme: 'ambiance', // 主题
        lineSeparator: '/LF', // 行分隔符
        // readOnly: localStorage.getItem('readOnly'),
        indentWithTabs: true,
        indentUnit: 4,
        smartIndent: true,
        // lineNumbers: true,
        matchBrackets: true,
        // theme: theme,
        autofocus: true,
        extraKeys: { Ctrl: 'autocomplete' }, // 自定义快捷键
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        hintOptions: { // 自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        }
        // gutters: ['cssName']
      }, optionsConfig)
      // cmOptions: JSON.parse(localStorage.getItem('currentConfig')) || JSON.parse(localStorage.getItem('defaltConfig'))
    }
  },
  watch: {
    code (val) {
      this.curCode = val
    },
    curCode (val) {
      this.$emit('changeCode', val)
    }
  },
  created () {
    this.curCode = this.code
    // this.cmOptions.theme = 'dracular'
    // this.cmOptions.readOnly = this.readOnly
  },
  methods: {
    show () {
      console.log(this.curCode)
    }
  }
}
</script>

<style>
.codesql {
  font-size: 11pt;
  text-align: left;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
}
.CodeMirror {
  min-height: calc(100vh - 15rem);
  /* height: 100%; */
  z-index: 1;
}
.CodeMirror-scroll {
  text-align: left;
}
.save-btn {
  top: 15rem;
  position: absolute;
  right: 5rem;
}
.code {
}
</style>
