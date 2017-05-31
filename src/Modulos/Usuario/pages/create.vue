<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      Criar Usuário
    </div>
    <div class="panel-body">
      <form v-loading="loading" @submit.prevent="newUser" @keydown="form.errors.clear($event.target.name)">
        <alert-success :form="form" :message="msg"></alert-success>
        <alert-errors :form="form" classe="alert bg-danger alert-styled-left" message=""></alert-errors>
        <div class="row">
          <div class="form-group col-lg-6">
            <label>Nome:</label>
            <input type="text" class="form-control" v-model="form.name" value="">
          </div>
          <div class="form-group col-lg-6">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="form.email" value="">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-6">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="form.password" value="">
          </div>
          <div class="form-group col-lg-6">
            <label>Password Confirmation:</label>
            <input type="password" class="form-control" v-model="form.password_confirmation" value="">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-12">
            <button type="submit" class="btn btn-primary">Criar </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Form } from 'vform'
import { userCreateUrl } from './../../../services/config'
export default {
  name: 'create',
  metaInfo: {
    titleTemplate: '%s - Novo Usuário'
  },
  data() {
    return {
      msg: '',
      loading: false,
      form: new Form({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
    }
  },
  methods: {
    clearForm() {
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.form.password_confirmation = ''
    },
    newUser() {
      this.loading = true
      let self = this
      this.form.post(userCreateUrl).then(response => {
        this.msg = response.data
        this.loading = false
        this.clearForm()
      }).catch(response => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="css">
</style>
