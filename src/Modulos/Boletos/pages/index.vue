<template>
  <div class="">
    <template v-if="$route.matched.length == 2">
      <h1>Gráfico de Boletos</h1>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
