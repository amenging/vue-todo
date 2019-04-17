<template>
  <div class="dialog" v-show="showExportForm">
    <div class="dialog-body">
      <div class="dialog-header"></div>
      <div class="dialog-content export-form">
        <div class="form-control">
          <input @change="toggleCheck" id="all" type="checkbox" />
          <label for="all"></label>
          <span>全选</span>
        </div>
        <div class="userMessage">清单列表</div>
        <div class="form-control" v-for="(list, index) in lists" :key="index">
          <input
            v-model="checkboxs"
            :value="index"
            :id="list.list_name"
            type="checkbox" />
          <label :for="list.list_name"></label>
          <span>{{ list.list_name }}</span>
        </div>
      </div>
      <div class="dialog-footer">
        <button @click="toggleExportForm">取消</button>
        <button @click="exportFile">导出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    props: {

    },

    data () {
      return {
        checkboxs: []
      }
    },

    computed: {
      ...mapState([
        'lists',
        'items',
        'showExportForm'
      ])
    },

    methods: {
      toggleCheck () {
        if (this.checkboxs.length == this.lists.length) {
          this.checkboxs = []
          return
        }

        const arr = []
        let i = 0
        while (i < this.lists.length) {
          arr.push(i)
          i ++
        }
        this.checkboxs = arr
      },

      ...mapMutations([
        'toggleExportForm'
      ]),

      exportFile () {
        if (this.checkboxs.length === 0) {
          this.$store.dispatch('toggleMessage', '你没有选择任何清单哦')
          return
        }

        let lists = this.lists.filter((ele, index) => {
          return this.checkboxs.indexOf(index) > -1
        })
        const list_ids = lists.map(ele => ele.list_id)

        this.items.forEach(ele => {
          if (list_ids.indexOf(ele.list_id) > -1) {
            const arr = lists[list_ids.indexOf(ele.list_id)]
            if (arr.items) {
              arr.items.push(ele.content)
            } else {
              arr.items = [ele.content]
            }
          }
        })

        lists = lists.map(ele => {
          return {
            list_name: ele.list_name,
            items: ele.items || []
          }
        })

        const file = JSON.stringify(lists)

        const blob = new Blob([file]), a = document.createElement("a")
        const date = new Date()
        const n = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() +
          date.getHours() + date.getMinutes() + date.getSeconds()

        a.href = window.URL.createObjectURL(blob)

        a.setAttribute('download', 'TODO-' + n + '.json')
        a.click()

        this.toggleExportForm()
      }
    }
  }
</script>

<style scoped='scoped'>
.dialog-body {
  width: 250px;
}
.form-control {
  margin: 10px auto;
  font-size: .9em;
}
.form-control label {
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}
.form-control input[type='checkbox'] {
  display: none;
}
.form-control input[type=checkbox]:checked + label {
  border: 1px solid #409eff;
}
.form-control input[type=checkbox]:checked + label::after {
  content: '';
  width: 14px;
  height: 14px;
  background: #409eff;
  position: absolute;
  top: 0;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
}
.userMessage {
  position: relative;
}
.userMessage::after, .userMessage::before {
  content: "";
  position: absolute;
  width: 30%;
  height: 1px;
  background: #ccc;
  margin: auto;
  top: 0;
  bottom: 0;
}
.userMessage::after {
  right: 0;
}
.userMessage::before {
  left: 0;
}
.export-form {
  max-height: 400px;
  overflow: scroll;
}
</style>
