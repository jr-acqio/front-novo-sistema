<template lang="html">
  <div class="row">

    <datatable-slot
    title="Lista de Boletos"
    id="table1"
    v-loading.body="loading"
    url="http://localhost:8000/api/teste"
    :headers="[
    { header: '#' },
    { header: 'Cliente' },
    { header: 'Valor' },
    { header: 'Nosso número' },
    { header: 'Status' },
    { header: 'Criado em' },
    { header: 'Vencimento'},
    { header: 'Ações' }
    ]">
    <tr v-for="(row, index) in rows">
      <td>{{ index + 1 }}</td>
      <td>{{ row.customer_person_name }}</td>
      <td>{{ formatNumber(row.amount) }}</td>
      <td>{{ row.processed_our_number }}</td>
      <td>{{ row.status }}</td>
      <td>{{ formatarData(row.created_at) }}</td>
      <td>{{ formatarData(row.expire_at) }}</td>
      <td sortable="false">
        <ul class="icons-list">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="icon-menu9"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-right">
              <li>
                <a target="_blank" :href="row.url">Visualizar <i class="icon-search4"></i></a>
                <a target="_blank" :href="row.formats.pdf">Download <i class="icon-download"></i></a>
                <!-- <router-link :to="{ name: 'role.edit', params: { id: row.id } }"><i class="icon-database-edit2"></i> Editar</router-link> -->
              </li>
            </ul>
          </li>
        </ul>
      </td>
    </tr>
  </datatable-slot>
  </div>

</template>

<script>
import accounting from 'accounting'
import { http } from 'plugins/http'
import { myMixin } from 'mixins/mixins'
export default {
  mixins: [myMixin],
  metaInfo: {
    titleTemplate: '%s - Consulta Boleto Simples'
  },
  data () {
    return {
      rows: []
    }
  },
  mounted() {
    let self = this
    this.fetchData().then(response => {
      this.$Progress.finish()
      this.rows = response.data
      // self.dtHandle = $('#' + 'table1').DataTable()
      // self.refreshTable()
      setTimeout(function() {
        self.dtHandle = $('#' + 'table1').DataTable()
      }, 1000)
    }).catch(error => {
      this.$Progress.fail()
      console.log(error)
    })
  },
  methods: {
    fetchData() {
      let url = process.env.NODE_ENV !== 'development' ? 'https://lab.acqio.co/' : 'http://localhost:8000'
      let self = this
      return new Promise(function(resolve, reject) {
        self.$Progress.start()
        http.get(url + '/api/boleto-simples').then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      });
    },
    formatNumber (value) {
      return 'R$ ' + accounting.formatNumber(value, 2)
    },
  }
}
</script>

<style lang="css">
</style>
