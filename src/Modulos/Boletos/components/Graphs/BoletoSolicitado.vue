<template>
  <div class="">
    <div class="panel panel-flat" v-loading.body="loading">
      <div class="panel-heading">
        <div class="row">
          <h6 class="panel-title col-lg-6"><i class="icon-graph"></i> Gráfico - Boletos Solicitados / Mês</h6>
          <div class="pull-right">
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="icon-calendar22"></i>
                </span>
                <input type="text" class="form-control daterange" v-model="timeRequest">
                <span class="input-group-btn">
                  <button @click="refreshData" class="btn btn-primary" type="button">Atualizar</button>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="panel-body">
        <chartjs-line :responsive="true" :height="50" :fill="false" datalabel="Boletos Solicitados" :labels="labels" :data="data" :bind="true"></chartjs-line>
      </div>
    </div>
  </div>
</template>

<script>
import { boletosSolicitados } from './../../../../services/config'
export default {
  data () {
    return {
      timeRequest: moment().startOf('year').format('DD/MM/YYYY') + ' - ' + moment().endOf('month').format('DD/MM/YYYY'),
      loading: false,
      label: "",
      labels: [],
      data: []
    }
  },
  methods: {
    refreshData() {
      self = this
      self.loading = true
      setTimeout(function () {
        self.fetchData()
      }, 1000)
    },
    fetchData() {
      this.axios.get(boletosSolicitados, { params: { data: this.timeRequest } }).then(response => {
        this.labels = []
        this.data = []
        for (var i = 0; i < response.data.length; i++) {
          this.labels.push(response.data[i].month_name)
          this.data.push(response.data[i].amount)
          this.label = "Boletos Solicitados"
          this.loading = false
        }
      }).catch(response => {
        this.loading = false
        console.log(response)
      })
    }
  },
  mounted() {
    let self = this
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
      ranges: {
        'Hoje': [moment(), moment()],
        'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Últimos 7 Dias': [moment().subtract(6, 'days'), moment()],
        'Últimos 30 Dias': [moment().subtract(29, 'days'), moment()],
        'Esse Mês': [moment().startOf('month'), moment().endOf('month')],
        'Último Mês': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }).on("input change", function (e) {
        self.timeRequest = e.target.value
    })
    self.loading = true
    setTimeout(function() {
      self.fetchData()
    }, 1000)
  }
}
</script>

<style lang="css">
</style>
