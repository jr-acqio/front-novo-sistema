<template>
  <div class="">
    <div class="panel panel-flat" v-loading.body="loading">
      <div class="panel-heading">
        <h6 class="panel-title">Gráfico - Boletos Solicitados / Mês</h6>
        <div class="heading-elements">
          <form class="heading-form" action="#">
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="icon-calendar22"></i></span>
                <input type="text" class="form-control daterange" v-model="timeRequest">
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
      // timeRequest: moment().format('DD-MM-YYYY') + ' - ' + moment().format('DD-MM-YYYY'),
      timeRequest: '',
      loading: true,
      label: "",
      labels: [],
      data: []
    }
  },
  mounted() {
    $('.daterange').daterangepicker({
      "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "Aplicar",
        "cancelLabel": "Cancelar",
        "fromLabel": "De",
        "toLabel": "Para",
        "customRangeLabel": "Customizado"
      },
      startDate: moment().format('DD-MM-YYYY'),
      endDate: moment().format('DD-MM-YYYY'),
      ranges: {
        'Hoje': [moment(), moment()],
        'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Últimos 7 Dias': [moment().subtract(6, 'days'), moment()],
        'Últimos 30 Dias': [moment().subtract(29, 'days'), moment()],
        'Esse Mês': [moment().startOf('month'), moment().endOf('month')],
        'Último Mês': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    })
    this.timeRequest = moment().format('DD-MM-YYYY') + ' - ' + moment().format('DD-MM-YYYY')
    let self = this
    setTimeout(function() {
      self.label = "Boletos Solicitados"
      self.labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Setembro", "Outubro", "Novembro", "Dezembro"]
      self.data = [65, 59, 80, 81, 56, 55, 40, 55, 10, 30, 15]
      self.loading = false
    }, 2000)
  }
}
</script>

<style lang="css">
</style>
