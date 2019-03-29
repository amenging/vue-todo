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
    computed: {
      ...mapState([
        'showLoading'
      ])
    },
  }
</script>
