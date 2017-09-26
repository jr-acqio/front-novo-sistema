<template>
  <!-- <slot> -->
  <transition name="page" mode="out-in">
    <router-view></router-view>
  </transition>
  <!-- </slot> -->
</template>

<script>
export default {
  name: 'child',
  beforeUpdate () {
    this.$Progress.start()
  },
  updated () {
    this.$Progress.finish()
  }
}
</script>

<style lang="css">
</style>
