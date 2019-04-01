<template>
  <div class="layout">
    <todo-header />
    <nuxt />
    <todo-footer />
  </div>
</template>

<style>
  .layout {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    padding-bottom: 77px;
    min-height: 88%;
  }
</style>

<script>
  import TodoHeader from '~/components/layouts/header'
  import TodoFooter from '~/components/layouts/footer'

  export default {
    components: {
      TodoHeader,
      TodoFooter,
    }
  }
</script>

