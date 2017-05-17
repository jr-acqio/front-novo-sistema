import Vue from 'vue'
require('lodash')
window.swal = require('sweetalert2')
window.$ = window.jQuery = require('jquery')

// chartjs package
require('chart.js')
// vue-charts package
require('hchs-vue-charts')
Vue.use(VueCharts)
window.daterangepicker = require('bootstrap-daterangepicker')
// require('switchery')
