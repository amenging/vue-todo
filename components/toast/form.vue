<template>
  <div class="dialog" v-show="showEditForm" @click="toggleEditForm">
    <div class="dialog-body" @click.stop.prevent="stop">
      <div class="dialog-content">
        <div class="form-control">
          <label>清单名称</label>
          <input
            v-focus="true"
            maxlength="10"
            @keyup.enter="submit"
            v-model.trim="currentEditListValue" />
        </div>
      </div>
      <div class="dialog-footer">
        <button @click="toggleEditForm">取消</button>
        <button @click="submit">确认</button>
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

      }
    },

    computed: {
      ...mapState([
        'showEditForm',
        'currentEditListIndex',
      ]),
      currentEditListValue: {
        get () {
          return this.$store.state.currentEditListValue
        },

        set (value) {
          this.setEditListValue(value)
        }
      }
    },

    methods: {
      stop () {},

      submit () {
        if (this.currentEditListValue === '') {
          this.$store.dispatch('toggleMessage', '你还什么都没写呢')
          return
        }
        if (this.currentEditListIndex === null) {
          this.$store.dispatch('addTodoList')
        } else {
          this.$store.dispatch('editTodoList')
        }
        this.toggleEditForm()
      },

      ...mapMutations([
        'toggleEditForm',
        'setEditListValue',
        'toggleMessage'
      ])
    }
  }
</script>

<style scoped='scoped'>

</style>
