<template lang="html">
  <div class="">
    <template v-if="$route.name === 'vindi'">
        <h1>Dash Vindi</h1>
    </template>

    <child v-else></child>
  </div>
</template>

<script>
export default {
  created () {
  }
}
</script>

<style lang="css">
</style>
