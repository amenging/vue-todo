<template>
  <div class="messageDiv" v-show="showLoading">
      <div class="waiting">
        <i class="iconfont icon-loading"></i>
      </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {

    },

    data () {
      return {

      }
    },

    computed: {
      ...mapState([
        'showLoading'
      ])
    },

    methods: {

    }
  }
</script>

<style scoped='scoped'>

</style>
