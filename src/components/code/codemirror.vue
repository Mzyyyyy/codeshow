<template>
  <div>
    <!-- v-model="codeInfo.content" -->
    <textarea ref="mycode"
              class="codesql"
              style="height:200px;width:600px;"></textarea>
  </div>

</template>
<script>
import 'codemirror/theme/ambiance.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
const CodeMirror = require('codemirror/lib/codemirror')
require('codemirror/addon/edit/matchbrackets')
require('codemirror/addon/selection/active-line')
require('codemirror/mode/sql/sql')
require('codemirror/addon/hint/show-hint')
require('codemirror/addon/hint/sql-hint')
export default {
  name: 'codeMirror',
  props: {
    codeInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // code: '//write code here'
    }
  },
  mounted () {
    // debugger
    // const mode = 'javaScript'
    // const theme = 'ambiance'// 设置主题，不设置的会使用默认主题
    const theme = 'seti'
    const editor = CodeMirror.fromTextArea(this.$refs.mycode, {
      mode: 'text/javascript', // 选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      theme: theme,
      autofocus: true,
      extraKeys: { Ctrl: 'autocomplete' }, // 自定义快捷键
      hintOptions: { // 自定义提示选项
        tables: {
          users: ['name', 'score', 'birthDate'],
          countries: ['name', 'population', 'size']
        }
      }
    })
    // 代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
    editor.on('cursorActivity', function () {
      editor.showHint()
    })
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
  z-index: 1;
}
.CodeMirror-scroll {
  text-align: left;
}
</style>
