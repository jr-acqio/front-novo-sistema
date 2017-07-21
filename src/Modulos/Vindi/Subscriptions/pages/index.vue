<template>
  <div class="">
      <h1>Assinaturas Vindi</h1>
  </div>
</template>

<script>
import { userURL } from '../../../../services/config'
import { http } from 'plugins/http'
import _ from 'lodash'
export default {
  metaInfo: {
    titleTemplate: '%s - Assinaturas Vindi'
  },
  data() {
    return {
      rows: []
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  created() {

  },
  methods: {
    fetchData() {
      http.get(userURL).then(response => {
        console.log(response)
        this.rows = response.data
        this.refreshTable()
      }).catch(error => {
        console.log(error)
      })
    },
    pluckRoles(roles) {
      return _.map(roles, 'display_name').join(', ')
      // console.log(_.map(roles, 'display_name'))
    },
    date (val) {
      return moment(val).format('DD/MM/YYYY HH:mm:ss')
    },
    askInactive(index) {
      let user = this.rows[index]
      swal({
        title: `Deseja inativar o usuário ${user.name} ?`,
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, inativar!",
        closeOnConfirm: false
      }, () => this.disabledUser(index))
    },
    askActive(index) {
      let user = this.rows[index]
      swal({
        title: `Deseja ativar o usuário ${user.name} ?`,
        text: ``,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, ativar!",
        closeOnConfirm: false
      }, () => this.enableUser(index))
    },
    disabledUser(index) {
      let user = this.rows[index]
      http.delete(userURL + '/' + user.id).then(response => {
        this.rows[index] = response.data
        swal(`Usuário ${user.name} inativado!`, "", "success")
        this.fetchData()
      })
    },
    enableUser(index) {
      let user = this.rows[index]
      http.put(userURL + '/' + user.id, { enabled: 1 }).then(response => {
        this.rows[index] = response.data.user
        swal(`Usuário ${user.name} ativado!`, "", "success")
        this.fetchData()
      })
    },
    refreshTable() {
      self.dtHandle.destroy()
      setTimeout(function() {
        self.dtHandle = $('#' + 'table1').DataTable()
      }, 100)
    }
  }
}
</script>

<style lang="css">
</style>
