<template>
  <div class="">
    <template v-if="$route.matched.length == 2">

      <el-dialog v-if="dialogVisible" title="Criar novo Grupo de Usuários" v-model="dialogVisible" size="small" :before-close="handleClose">
        <div class="row">
          <form v-loading="loading" @submit.prevent="newGroup" @keydown="form.errors.clear($event.target.name)">
            <alert-success :form="form" :message="msg"></alert-success>
            <alert-errors :form="form" classe="alert bg-danger alert-styled-left" message=""></alert-errors>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="">Nome</label>
                  <input type="text" class="form-control" v-model="form.name">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="">Nome de Exibição</label>
                  <input type="text" class="form-control" v-model="form.display_name">
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label for="">Descrição</label>
                  <textarea class="form-control" rows="5" cols="80" v-model="form.description"></textarea>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <button type="submit" class="btn bg-blue btn-labeled heading-btn"><b><i class="icon-floppy-disk"></i></b> SALVAR</button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Fechar</el-button>
          <!-- <el-button type="primary" @click="dialogVisible = false">Confirm</el-button> -->
        </span>
      </el-dialog>

      <div class="row">
        <div class="col-lg-12">
          <button type="button" @click="dialogVisible = true" class="pull-right btn bg-blue btn-labeled heading-btn"><b><i class="icon-users4"></i></b> Criar Grupo</button>
        </div>
      </div>
      <br>
      <div class="row">
        <datatable-slot
        title="Grupos de Usuário"
        id="table1"
        v-loading.body="loading"
        url="http://localhost:8000/api/teste"
        :headers="[
        { header: '#' },
        { header: 'Nome' },
        { header: 'Nome de Exibição' },
        { header: 'Descrição' },
        { header: 'Criado em' },
        { header: 'Ações' }
        ]">
        <tr v-for="(row, index) in rows">
          <td>{{ index + 1 }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.display_name }}</td>
          <td>{{ row.description }}</td>
          <td>{{ row.created_at }}</td>
          <td sortable="false">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li>
                    <router-link :to="{ name: 'role.edit', params: { id: row.id } }"><i class="icon-database-edit2"></i> Editar</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
      </datatable-slot>
      </div>

  </template>
  <template v-else>
    <router-view></router-view>
  </template>
</div>
</template>

<script>
import { Form } from 'vform'
import { roleUrl } from '../../../../services/config'
import { http } from 'plugins/http'
export default {
  metaInfo: {
    titleTemplate: '%s - Usuários'
  },
  data() {
    return {
      form: new Form({
        name: '',
        display_name: '',
        description: ''
      }),
      rows: [],
      dialogVisible: false,
      loading: false,
      msg: ''
    }
  },
  methods: {
    openModal() {
      this.dialogVisible = true
    },
    newGroup() {
      this.loading = true
      this.form.post(roleUrl).then(response => {
        this.msg = 'Papel ' + response.data.name + ' criado com sucesso!'
        this.rows.push(response.data)
        this.refreshTable()
        this.loading = false
        this.form.reset()
      }).catch(response => {
        this.loading = false
      })
    },
    refreshTable() {
      self.dtHandle.destroy()
      setTimeout(function() {
        self.dtHandle = $('#' + 'table1').DataTable()
      }, 100)
    },
    fetchData() {
      http.get(roleUrl).then(response => {
        console.log(response)
        this.rows = response.data
        this.refreshTable()
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    this.fetchData()
    setTimeout(function() {
      self.dtHandle = $('#' + 'table1').DataTable()
    }, 100)
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>

<style lang="css">
</style>
