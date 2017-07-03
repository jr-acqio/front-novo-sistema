<template>
  <div class="">

      <div class="row row-condensed">
        <div class="col-xs-4">
          <button type="button" class="btn bg-teal-400 btn-block btn-float btn-float-lg"><i class="icon-database-add"></i> <span>Add Novo Grupo</span></button>
        </div>
        <div class="col-xs-4">
          <button type="button" class="btn bg-blue-400 btn-block btn-float btn-float-lg"><i class="icon-database-edit2"></i> <span>Editar</span></button>
        </div>
        <div class="col-xs-4">
          <router-link class="btn bg-warning-400 btn-block btn-float btn-float-lg" :to="{ name: 'role.index', params: {} }">
            <i class="icon-list"></i> <span>Listar Todos</span>
          </router-link>
        </div>
      </div>
    <br>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h6 class="panel-title">Grupo ({{ form.name }})<a class="heading-elements-toggle"><i class="icon-more"></i></a></h6>
        <div class="heading-elements">
          <ul class="icons-list">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="icon-menu7"></i> <span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-menu-right">
                <li @click="dialogFormVisible = true">
                  <a href="javascript:void(0)">
                    <i class="icon-sync"></i> Atualizar dados
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="panel-body">
        <alert-errors :form="form" classe="alert bg-danger alert-styled-left" message=""></alert-errors>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-6">
              <label for="">Nome:</label>
              <input type="text" name="" class="form-control" v-model="form.name">
            </div>
            <div class="col-lg-6">
              <label for="">Nome de Exibição:</label>
              <input type="text" name="" class="form-control" v-model="form.display_name">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row">
            <div class="col-lg-6">
              <label for="">Criado em:</label>
              <input type="text" name="" disabled class="form-control" :value="date(form.created_at)">
            </div>
            <div class="col-lg-6">
              <label for="">Ultima atualização:</label>
              <input type="text" name="" disabled class="form-control" :value="date(form.updated_at)">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 form-group">
            <label for="">Níveis de Permissão</label><br>
            <el-select :disabled="form.checked" v-model="form.perms" multiple placeholder="Escolha os Niveis de Permissão">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="col-lg-6 form-group">
            <el-checkbox v-model="form.checked">Todas as Permissões</el-checkbox>
          </div>
        </div>
        <div class="form-group">
          <el-button type="primary" @click="askEdit()" :loading="loading">EDITAR</el-button>
        </div>
        <div class="form-group">
          <label for="">Permissões associadas ({{ tableData.length }})</label><br>
          <el-table :data="tableData" border :default-sort = "{prop: 'date', order: 'descending'}" style="width: 100%">
            <el-table-column prop="name" label="Nome" sortable width="180"></el-table-column>
            <el-table-column prop="display_name" label="Nome de Exibição" sortable width="180"></el-table-column>
            <el-table-column prop="description" label="Descrição" sortable width="180"></el-table-column>
            <el-table-column prop="created_at" :formatter="formatterCreated" label="Data de criação" sortable width="180"></el-table-column>
            <el-table-column prop="updated_at" :formatter="formatterUpdated" label="Data de atualização" sortable></el-table-column>
          </el-table>
        </div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import { http } from 'plugins/http'
import { roleUrl, permUrl } from '../../../../services/config'
import { Form } from 'vform'
export default {
  data() {
    return {
      tableData: [],
      options: [],
      loading: false,
      form: new Form({
        checked: false,
        perms: [],
        name: '',
        display_name: '',
        description: ''
      })
    }
  },
  created() {
    this.fetchRole()
    this.fetchPerms()
  },
  methods: {
    fetchRole() {
      console.log(roleUrl + '/' + this.$route.params.id)
      http.get(roleUrl + '/' + this.$route.params.id)
      .then(response => {
        let { name, description, display_name } = response.data
        this.form.name = name
        this.form.display_name = display_name
        this.form.description = description
        this.tableData = response.data.perms
      })
    },
    fetchPerms() {
      let options = []
      http.get(permUrl).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          options.push({ value: response.data[i].id, label: response.data[i].name })
        }
        this.options = options
      })
    },
    askEdit() {
      swal({
        title: `Confirmar atualização do Grupo: ${this.form.name} ?`,
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, atualizar!",
        closeOnConfirm: false
      }, () => this.updateGroup())
    },
    updateGroup() {
      this.loading = true
      this.form.put(roleUrl + '/' + this.$route.params.id)
      .then(response => {
        swal("Dados atualizados!", "", "success")
        this.loading = false
        this.form.reset()
        this.fetchRole()
      })
      .catch(error => {
        sweetAlert("Oops...", "Verifique os erros", "error")
        console.log(error)
        this.loading = false
      })
    },
    formatterCreated(row, column) {
      return moment(row.created_at).format('DD/MM/YYYY HH:mm:ss')
    },
    formatterUpdated(row, column) {
      return moment(row.updated_at).format('DD/MM/YYYY HH:mm:ss')
    },
    date (val) {
      return moment(val).format('DD/MM/YYYY HH:mm:ss')
    }
  },
  watch: {
    '$route': ['fetchRole', 'fetchPerms']
  }
}
</script>

<style lang="css">
</style>
