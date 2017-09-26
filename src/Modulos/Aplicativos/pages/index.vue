<template>
  <div class="">
    <template v-if="$route.matched.length == 2">
      <!-- <div class="panel panel-default"> -->
        <!-- <div class="panel-body"> -->
        <div class="col-xs-6">
          <router-link :to="{ name: 'app.kf.lancar-valores-admin', params: {} }" class="btn bg-teal-400 btn-block btn-float btn-float-lg">
            <i class="icon-coins"></i> <span>Lançar valores no Admin</span>
          </router-link>
        </div>
        <div class="col-xs-6">
          <router-link :to="{ name: 'app.kf.liberacao-pagamento', params: {} }" class="btn bg-warning-400 btn-block btn-float btn-float-lg">
            <i class="icon-cash3"></i> <span>Liberação de pagamento</span>
          </router-link>
        </div>
        <!-- </div> -->
      <!-- </div> -->

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
