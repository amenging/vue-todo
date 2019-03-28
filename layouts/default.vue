<template>
  <div>
    <todo-header />
    <nuxt />
    <todo-footer />
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
  import TodoFooter from '~/components/layouts/footer'

  export default {
    components: {
      TodoHeader,
      TodoFooter,
    }
  }
</script>

