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
      { header: 'Criado em' },
      { header: 'Ações' }
      ]">
      <tr v-for="(row, index) in rows">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.email }}</td>
        <td>{{ row.created_at }}</td>
        <td sortable="false">
          <ul class="icons-list">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="icon-menu9"></i>
              </a>

              <ul class="dropdown-menu dropdown-menu-right">

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
import { userCreateUrl } from '../../../services/config'
import { http } from 'plugins/http'
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
    http.get(userCreateUrl).then(response => {
      console.log(response)
      this.rows = response.data
      setTimeout(function() {
        self.dtHandle = $('#' + 'table1').DataTable()
    }, 100)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style lang="css">
</style>
