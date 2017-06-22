<template>
  <div class="">
    <!-- Page container -->
    <div class="page-container">

      <!-- Page content -->
      <div class="page-content">

        <!-- Main content -->
        <div class="content-wrapper">

          <!-- Content area -->
          <div class="content">

            <!-- Password recovery -->
            <form v-on:submit.prevent="handleForgotPasswordSubmit()">
              <div class="panel panel-body login-form">
                <div class="text-center">
                  <div class="icon-object border-warning text-warning"><i class="icon-spinner11"></i></div>
                  <h5 class="content-group">Password recovery <small class="display-block">We'll send you instructions in email</small></h5>
                </div>

                <div class="form-group has-feedback">
                  <input type="email" class="form-control" placeholder="Your email">
                  <div class="form-control-feedback">
                    <i class="icon-mail5 text-muted"></i>
                  </div>
                </div>

                <button type="submit" class="btn bg-blue btn-block"><b>Reset password</b> <i class="icon-arrow-right14 position-right"></i></button>

                <router-link :to="{ name: 'auth.signin' }" class="btn btn-default btn-block">
                  <b>Voltar</b>
                </router-link>
              </div>
            </form>
            <!-- /password recovery -->

          </div>
          <!-- /content area -->

        </div>
        <!-- /main content -->

      </div>
      <!-- /page content -->

    </div>
    <!-- /page container -->
  </div>
</template>

<script>
import {forgotPassword} from './../../../../services/config'
export default {
  metaInfo: {
    titleTemplate: '%s - Recuperar Senha'
  },
  data () {
    return {
      email: ''
    }
  },
  created () {
    $('body').addClass('login-container')
  },
  methods: {
    handleForgotPasswordSubmit () {
      var postData = {
        email: this.email,
        url: 'http://localhost:8080'
      }
      this.$http.post(forgotPassword, postData).then(response => {
        console.log('response', response)
        this.$router.push({name: 'home'})
      }).catch(response => {
        console.log('response', response)
        window.alert(response.body.data)
      })
    }
  }
}
</script>

  <style lang="sass" scoped>

    </style>
