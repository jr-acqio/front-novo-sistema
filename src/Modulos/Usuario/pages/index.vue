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
      { header: 'Criado em' },
      { header: 'Ações' }
      ]">
      <tr v-for="(row, index) in rows">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.email }}</td>
        <td>{{ pluckRoles(row.roles) }}</td>
        <td>{{ row.created_at }}</td>
        <td sortable="false">
          <ul class="icons-list">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="icon-menu9"></i>
              </a>

              <ul class="dropdown-menu dropdown-menu-right">
                <li @click="deleteUser(row)">
                  <a href="javascript:void(0)"><i class="icon-database-remove"></i> Excluir</a>
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
  created() {
    http.get(userURL).then(response => {
      console.log(response)
      this.rows = response.data
      setTimeout(function() {
        self.dtHandle = $('#' + 'table1').DataTable()
    }, 100)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    pluckRoles(roles) {
      return _.map(roles, 'display_name').join(', ')
      // console.log(_.map(roles, 'display_name'))
    },
    deleteUser(user) {
      http.delete(userURL + '/' + user.id).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="css">
</style>
