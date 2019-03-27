<template>
  <div>
    <todo-header />
    <nuxt />
  </div>
</template>

<style>
@font-face {
  font-family: 'Josefin_Sans';
  src: url('/font/JosefinSans-Regular.ttf');
  font-display: fallback;
}
html, body {
  font-family: 'Josefin_Sans', 'Microsoft JhengHei', 'Microsoft YaHei';
}
</style>

<script>
import TodoHeader from '~/components/layouts/header'

export default {
  components: {
    TodoHeader
  }
}
</script>

