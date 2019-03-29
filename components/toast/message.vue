<template>
  <div class="messageDiv" v-show="message.show">
    <div class="warning">
      {{ message.content }}
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'message'
      ])
    },
  }
</script>
