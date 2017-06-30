<template lang="html">
  <div class="">

    <!-- Form -->
<el-dialog title="Atualizar Perfil" v-model="dialogFormVisible" :visible.sync="dialogFormVisible">
  <form @keydown="form.errors.clear($event.target.name)" @keyup.enter="updateProfile">
    <alert-errors :form="form" classe="alert bg-danger alert-styled-left" message=""></alert-errors>
    <div class="form-group">
      <label>Name:</label>
      <input type="text" class="form-control" v-model="form.name">
    </div>
    <div class="form-group">
      <label>Email:</label>
      <input type="text" class="form-control" v-model="form.email">
    </div>
    <div class="form-group">
      <label>Password:</label>
      <input type="password" class="form-control" v-model="form.password">
    </div>
    <div class="form-group">
      <label>Password Confirmation:</label>
      <input type="password" class="form-control" v-model="form.password_confirmation">
    </div>
    <div class="form-group">
      <label for="">Níveis de Permissão</label><br>
      <el-select v-model="form.roles" multiple placeholder="Escolha os Niveis de Permissão">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
  </form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancelar</el-button>
    <el-button native-type="submit" type="primary" @click="updateProfile" :loading="loadingButton">Atualizar</el-button>

    <!-- <button type="submit" class="btn btn-primary" v-loading="loadingButton" @click="updateProfile">Atualizar</button> -->
  </span>
</el-dialog>

    <alert-success :form="form" :message="msg"></alert-success>
    <div class="panel panel-default" v-loading.body="loading">
      <div class="panel-heading">
        <h6 class="panel-title">Meu Perfil<a class="heading-elements-toggle"><i class="icon-more"></i></a></h6>
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
      <div class="panel-body" v-if="user">
        <div class="form-group">
          <div class="row">
            <div class="col-lg-6">
              <label for="">Nome:</label>
              <input type="text" name="" disabled class="form-control" v-model="user.name">
            </div>
            <div class="col-lg-6">
              <label for="">Email:</label>
              <input type="text" name="" disabled class="form-control" v-model="user.email">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row">
            <div class="col-lg-6">
              <label for="">Criado em:</label>
              <input type="text" name="" disabled class="form-control" :value="date(user.created_at)">
            </div>
            <div class="col-lg-6">
              <label for="">Ultima atualização:</label>
              <input type="text" name="" disabled class="form-control" :value="date(user.updated_at)">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="">Níveis de Permissão</label><br>
          <ul>
            <li v-for="item in user.roles">{{ item.display_name }}</li>
          </ul>
          <!-- <el-select disabled :value="user.roles[0]" multiple>
            <el-option
              v-for="item in user.roles"
              itemSelected="true"
              :key="item.id"
              :label="item.display_name"
              :value="item.id">
            </el-option>
          </el-select> -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { userUrl, getHeader, userCreateUrl, roleUrl } from './../../../services/config'
import Form from 'vform'
import { http } from 'plugins/http'
export default {
  metaInfo: {
    titleTemplate: '%s - Meu Perfil'
  },
  data() {
    return {
      user: '',
      msg: '',
      options: [],
      form: new Form({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: []
      }),
      loading: true,
      loadingButton: false,
      dialogFormVisible: false
    }
  },
  watch: {
    user (newUser) {
      this.form.name = newUser.name
      this.form.email = newUser.email
    }
  },
  methods: {
    date (val) {
      return moment(val).format('DD/MM/YYYY HH:mm:ss')
    },
    clearForm() {
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.form.password_confirmation = ''
    },
    updateProfile() {
      this.loadingButton = true
      this.form.put(userCreateUrl + '/' + this.user.id).then(response => {
        this.msg = "Usuário " + response.data.user.name + " atualizado com sucesso!"
        window.localStorage.setItem('authUser', JSON.stringify(response.data.user))
        this.user = response.data.user
        this.$store.dispatch('setUser', response.data.user)
        this.clearForm()
        this.loadingButton = false
        this.dialogFormVisible = false
      }).catch(error => {
        this.loadingButton = false
        console.log(error)
      })
    }
  },
  created() {
    let self = this
    setTimeout(function() {
      http.get(userUrl).then(response => {
        self.user = response.data
        self.form.name = self.user.name
        self.form.email = self.user.email
      }).catch(response => {
        console.log(response)
        self.$notify({ title: 'Erro', message: 'Houve um erro de resposta no servidor', type: 'error', duration: 5000 })
      })
      self.loading = false
    }, 1000)
    let options = []
    http.get(roleUrl).then(response => {
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i])
        options.push({ value: response.data[i].id, label: response.data[i].display_name })
      }
      this.options = options
    })
  }
}
</script>

<style lang="css">
</style>
