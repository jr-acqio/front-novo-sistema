<template>
  <div class="">
    <template v-if="$route.matched.length == 2">
      <div class="pull-right">
        <div class="col-lg-12 form-group">
          <router-link to="/users/create" class="btn bg-blue btn-labeled heading-btn"><b><i class="icon-user-plus"></i></b> Criar Usuário</router-link>
        </div>
      </div>
      <datatable-slot
      title="Lista de Usuários"
      id="table1"
      v-loading.body="loading"
      url="http://localhost:8000/api/teste"
      :headers="[
      { header: '#' },
      { header: 'Nome' },
      { header: 'Email' },
      { header: 'Niveis de Acesso' },
      { header: 'Status' },
      { header: 'Criado em' },
      { header: 'Ações' }
      ]">
      <tr v-for="(row, index) in rows">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.email }}</td>
        <td>{{ pluckRoles(row.roles) }}</td>
        <td>
          <span class="label bg-success" v-if="row.deleted_at === null">Ativo</span>
          <el-tooltip v-else style="cursor:pointer;" :content="'Usuário desativado em ' + date(row.deleted_at) " placement="top">
            <span class="label bg-danger">Inativo</span>
          </el-tooltip>
        </td>
        <td>{{ date(row.created_at) }}</td>
        <td sortable="false">
          <ul class="icons-list">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="icon-menu9"></i>
              </a>

              <ul class="dropdown-menu dropdown-menu-right">
                <li v-if="row.deleted_at === null" @click="askInactive(index)">
                  <a href="javascript:void(0)"><i class="icon-database-remove"></i> Inativar</a>
                </li>
                <li v-else @click="askActive(index)">
                  <a href="javascript:void(0)"><i class="icon-database-add"></i> Ativar</a>
                </li>
              </ul>
            </li>
          </ul>
        </td>
      </tr>
    </datatable-slot>

  </template>
  <template v-else>
    <router-view></router-view>
  </template>
</div>
</template>

<script>
import { userURL } from '../../../services/config'
import { http } from 'plugins/http'
import _ from 'lodash'
export default {
  metaInfo: {
    titleTemplate: '%s - Usuários'
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
    this.fetchData()
    setTimeout(function() {
      self.dtHandle = $('#' + 'table1').DataTable()
    }, 100)
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
