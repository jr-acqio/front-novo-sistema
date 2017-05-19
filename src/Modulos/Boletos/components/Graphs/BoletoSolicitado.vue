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
        <chartjs-line :responsive="true" :height="50" :fill="false" datalabel="Boletos Solicitados" :labels="labels" :data="data" :bind="true"></chartjs-line>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeRequest: moment().startOf('month').format('DD/MM/YYYY') + ' - ' + moment().endOf('month').format('DD/MM/YYYY'),
      // timeRequest: '',
      loading: false,
      label: "",
      labels: [],
      data: []
    }
  },
  watch: {
    timeRequest(val) {
      console.log(val)
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      this.axios.get('http://localhost:8081/api/v1/boletos-solicitados', { params: { data: this.timeRequest } }).then(response => {
        console.log(response)
        this.labels = []
        this.data = []
        for (var i = 0; i < response.data.length; i++) {
          this.labels.push(response.data[i].month_name)
          this.data.push(response.data[i].amount)
          this.label = "Boletos Solicitados"
          this.loading = false
        }
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
      startDate: moment().startOf('month').format('DD/MM/YYYY'),
      endDate: moment().endOf('month').format('DD/MM/YYYY'),
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
        self.fetchData()
    })
    self.fetchData()
    // this.timeRequest = moment().format('DD-MM-YYYY') + ' - ' + moment().format('DD-MM-YYYY')
  }
}
</script>

<style lang="css">
</style>
