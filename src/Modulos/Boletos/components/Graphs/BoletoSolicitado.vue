<template>
  <div class="">
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h6 class="panel-title">Gráfico - Boletos Solicitados / Mês</h6>
        <div class="heading-elements">
          <form class="heading-form" action="#">
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="icon-calendar22"></i></span>
                <input type="text" class="form-control daterange" value="">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="panel-body">
        <chartjs-line :height="50" :fill="false" datalabel="Boletos Solicitados" :labels="labels" :data="data" :bind="true"></chartjs-line>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
		return {
			label: "Boletos Solicitados",
			labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Setembro", "Outubro", "Novembro", "Dezembro"],
			data: [65, 59, 80, 81, 56, 55, 40, 55, 10, 30, 15]
		}
	},
  mounted() {
    $('.daterange').daterangepicker()
  }
}
</script>

<style lang="css">
</style>
