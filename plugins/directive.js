import Vue from 'vue'

Vue.directive('focus', {
  inserted (el, {value}) {
    if (value) {
      el.focus()
    }
  }
})
