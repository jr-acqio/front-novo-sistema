<template lang="html">
  <div class="">
      <div class="panel panel-default" v-loading.body="loading">
        <div class="panel-heading">
          Meu Perfil
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
                <input type="text" name="" disabled class="form-control" v-model="user.created_at">
              </div>
              <div class="col-lg-6">
                <label for="">Ultima atualização:</label>
                <input type="text" name="" disabled class="form-control" v-model="user.updated_at">
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { userUrl, getHeader } from './../../../services/config'
import axios from 'axios'
export default {
  metaInfo: {
    titleTemplate: '%s - Meu Perfil'
  },
  data() {
    return {
      user: '',
      loading: true
    }
  },
  created() {
    let self = this
    setTimeout(function() {
      self.$http.get(userUrl, { headers: getHeader() }).then(response => {
        self.user = response.data
      }).catch(response => {
        console.log(response)
        self.$notify({ title: 'Erro', message: 'Houve um erro de resposta no servidor', type: 'error', duration: 5000 })
      })
      self.loading = false
    }, 1000)
  }
}
</script>

<style lang="css">
</style>
