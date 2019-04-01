<template>
  <div class="buttonMenu">
    <button
      class="addNewList"
      @click="addNewList"
      @mouseenter="showTips('新增清单', $event)"
      @mouseleave="hideTips">
      <i class="iconfont icon-add"></i>
    </button>
    <button
      class="exportFile"
      @click="exportFile"
      @mouseenter="showTips('导出json文件', $event)"
      @mouseleave="hideTips">
      <i class="iconfont icon-cloud-down"></i>
    </button>
    <label
      class="importFile"
      for="file"
      @mouseenter="showTips('导入json文件', $event)"
      @mouseleave="hideTips">
      <i class="iconfont icon-cloud-up"></i>
    </label>
    <input hidden
      ref="fileInput"
      @change="importFile($event)"
      id="file"
      type="file" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import { importFile } from '@/assets/api/todo'

  export default {
    props: {

    },

    data () {
      return {

      }
    },

    computed: {
      ...mapState([
        'USER_ID'
      ])
    },

    methods: {
      showTips (content, e) {
        this.$store.dispatch('toggleTips', {
          content,
          style: {
            top: e.y + 20 + 'px',
            left: e.x + 'px'
          }
        })
      },

      hideTips () {
        this.$store.dispatch('toggleTips')
      },

      addNewList () {
        if (this.USER_ID == null) {
          this.$store.dispatch('toggleMessage', '请先登录或注册哦')
          return
        }

        this.toggleEditForm()
        this.setEditListValue('')
      },

      exportFile () {
        if (this.USER_ID == null) {
          this.$store.dispatch('toggleMessage', '请先登录或注册哦')
          return
        }

        this.toggleExportForm()
      },

      importFile (e) {
        if (this.USER_ID == null) {
          this.$store.dispatch('toggleMessage', '请先登录或注册哦')
          return
        }

        const file = this.$refs.fileInput.files[0]

        const reg = /.json$/
        if (!reg.test(file.name)) {
          this.showWarning('请提交json文件哦')
          return
        }

        const _this = this

        const reader = new FileReader()
        reader.readAsText(file, 'uft-8')
        reader.onload = e => {
          console.log(JSON.parse(e.target.result))

          importFile({
            data: JSON.parse(e.target.result),
            user_id: this.USER_ID
          }).then(res => {
            if (res.data.code === 0) {
              this.$store.dispatch('toggleMessage', '导入成功！')
              setTimeout(() => {
                window.location.reload()
              }, 1000)
            }
          })
        }
      },

      ...mapMutations([
        'toggleEditForm',
        'setEditListValue',
        'toggleExportForm'
      ])

    }
  }
</script>

<style scoped='scoped'>

</style>
