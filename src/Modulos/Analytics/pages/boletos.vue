<template>
  <!-- <div class=""> -->
  <div class="panel panel-default">
    <div class="panel-heading">
      Analytics Boletos
    </div>
    <div class="panel-body">

      <div id="embed-api-auth-container"></div>
      <h1>Gráfico de Sessões</h1>
      <div id="chart-container"></div>
      <div id="view-selector-container"></div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    titleTemplate: '%s - Analytics Boleto'
  },
  data() {
    return {
      CLIENT_ID: '1064016171890-33ska3ge53e03ikk4na1rjg6hqio6fbq.apps.googleusercontent.com',
      SCOPES: ['https://www.googleapis.com/auth/analytics.readonly'],
      access_token: '',
      loading: false
    }
  },
  methods: {
    authorize(event) {
      self = this
      gapi.analytics.auth.authorize({
        container: 'embed-api-auth-container',
        clientid: self.CLIENT_ID
      })
      var viewSelector = new gapi.analytics.ViewSelector({
        container: 'view-selector-container'
      })
      // Render the view selector to the page.
      viewSelector.execute()
      var dataChart = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: 'ga:sessions',
          dimensions: 'ga:date',
          'start-date': '30daysAgo',
          'end-date': 'today'
        },
        chart: {
          container: 'chart-container',
          type: 'LINE',
          options: {
            width: '100%'
          }
        }
      })
      viewSelector.on('change', function(ids) {
        dataChart.set({query: {ids: ids}}).execute()
      })
    },
    querySessions() {
      this.$http.get("https://www.googleapis.com/analytics/v3/data/realtime?access_token=" + this.access_token).then(response => {
        // console.log(response)
      })
    }
  },
  mounted() {
    this.authorize()
  }
}
</script>

<style lang="css">
</style>
