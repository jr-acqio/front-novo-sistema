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
    <div class="panel panel-default" v-loading.body="loading">
      <div class="panel-heading">
        <h6 class="panel-title">Grupo ({{ role.name }})<a class="heading-elements-toggle"><i class="icon-more"></i></a></h6>
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
        <div class="form-group">
          <div class="row">
            <div class="col-lg-6">
              <label for="">Nome:</label>
              <input type="text" name="" disabled class="form-control" v-model="role.name">
            </div>
            <div class="col-lg-6">
              <label for="">Email:</label>
              <input type="text" name="" disabled class="form-control" v-model="role.display_name">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row">
            <div class="col-lg-6">
              <label for="">Criado em:</label>
              <input type="text" name="" disabled class="form-control" :value="date(role.created_at)">
            </div>
            <div class="col-lg-6">
              <label for="">Ultima atualização:</label>
              <input type="text" name="" disabled class="form-control" :value="date(role.updated_at)">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="">Permissões associadas</label><br>
          <el-table :data="role.perms" border :default-sort = "{prop: 'date', order: 'descending'}" style="width: 100%">
            <el-table-column prop="name" label="Nome" sortable width="180"></el-table-column>
            <el-table-column prop="display_name" label="Nome de Exibição" sortable width="180"></el-table-column>
            <el-table-column prop="description" label="Descrição" sortable width="180"></el-table-column>
            <el-table-column prop="created_at" label="Data de criação" sortable width="180"></el-table-column>
            <el-table-column prop="updated_at" label="Data de atualização" sortable></el-table-column>
          </el-table>
        </div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import { http } from 'plugins/http'
import { roleUrl } from '../../../../services/config'
import { Form } from 'vform'
export default {
  data() {
    return {
      role: '',
      form: new Form({

      })
    }
  },
  created() {
    this.fetchRole()
  },
  methods: {
    fetchRole() {
      console.log(roleUrl + '/' + this.$route.params.id)
      http.get(roleUrl + '/' + this.$route.params.id)
      .then(response => {
        this.role = response.data
      })
    },
    date (val) {
      return moment(val).format('DD/MM/YYYY HH:mm:ss')
    }
  },
  watch: {
    '$route': 'fetchRole'
  }
}
</script>

<style lang="css">
</style>
