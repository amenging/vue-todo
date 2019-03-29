<template>
  <div class="tips" :style="tips.style" v-show='tips.show'>
    <span>{{ tips.conntent }}</span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'tips'
      ])
    }
  }
</script>
