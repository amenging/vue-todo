<template>
  <div class="dialog" v-show="prompt.show">
    <div class="dialog-body">
      <div class="dialog-header"></div>
      <div class="dialog-content prompt-dialog">
        {{ prompt.content }}
      </div>
      <div class="dialog-footer">
        <button @click="togglePrompt()">取消</button>
        <button @click="confirmPrompt">确认</button>
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
        'prompt'
      ])
    },

    methods: {
      confirmPrompt () {
        this.$store.dispatch(this.prompt.next, this.prompt.data)
        this.togglePrompt()
      },

      ...mapMutations([
        'togglePrompt'
      ])
    }
  }
</script>

<style scoped='scoped'>
  .dialog-body {
    min-width: 300px;
    text-align: center;
  }
  .dialog-content {
    padding: 30px;
  }
</style>
