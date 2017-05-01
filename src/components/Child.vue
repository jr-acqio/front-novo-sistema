<template>
  <!-- <slot> -->
  <transition name="page" mode="out-in">
    <router-view></router-view>
  </transition>
  <!-- </slot> -->
</template>

<script>
export default {
  name: 'child'
}
</script>

<style lang="css">
</style>
