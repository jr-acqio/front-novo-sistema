<template>
  <div class="">
    <template v-if="$route.matched.length == 2">
      <h1>Lista de Usuários</h1>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$route)
  }
}
</script>

<style lang="css">
</style>
