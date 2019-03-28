<template>
  <div class="buttonMenu">
    <button
      class="addNewList"
      @click='addNewList'
      @mouseenter='showTips("新增清单", $event)'>
      <i class="iconfont icon-add"></i>
    </button>
    <button
      class="exportFile"
      @click='exportFile'
      @mouseenter='showTips("导出json文件", $event)'>
      <i class="iconfont icon-cloud-down"></i>
    </button>
    <label
      class="importFile"
      for="file"
      @mouseenter='showTips("导入json文件", $event)'>
      <i class="iconfont icon-cloud-up"></i>
    </label>
    <input hidden
      ref='fileInput'
      @change='importFile($event)'
      id="file"
      type="file" />
  </div>
</template>

<script>

  export default {
    props: {

    },

    data () {
      return {

      }
    },

    methods: {
      showTips () {},

      addNewList () {},

      exportFile () {},

      importFile () {},

    }
  }
</script>

<style scoped='scoped'>

</style>
