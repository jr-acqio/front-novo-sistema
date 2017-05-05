<script>
  import {loginUrl, getHeader, userUrl} from './../services/config'
  import {clientId, clientSecret} from './../env'
  import {mapState} from 'vuex'
  import { Form } from 'vform'
  import VueRecaptcha from 'vue-recaptcha'
  export default {
    metaInfo: {
      titleTemplate: '%s - Login'
    },
    components: {
      VueRecaptcha
    },
    created () {
      this.$nextTick(function () {
        $.getScript('/static/assets/js/plugins/forms/styling/uniform.min.js')
        $.getScript('/static/assets/js/pages/login.js')
        // $.getScript('https://www.google.com/recaptcha/api.js')
        $.getScript('https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
        $('body').addClass('login-container')
        // console.log(this.form)
      })
    },
    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },
    data () {
      return {
        form: new Form({
          grant_type: 'password',
          client_id: clientId,
          client_secret: clientSecret,
          // email: '',
          captcha: '',
          email: '',
          password: '',
          scope: ''
        }),
        key: '6LcOVB8UAAAAAFuiPdmlj_IKgmqYVIfO7gfHUPs3'
      }
    },
    methods: {
      onVerify(resp) {
        this.form.captcha = resp
      },
      onExpired: function () {
        this.$notify({
          title: 'Alerta',
          message: 'Sessão expirada, renove seu captcha',
          type: 'warning',
          duration: 5000
        })
        this.form.captcha = ''
      },
      handleLoginFormSubmit () {
        // var postData = {
        //     grant_type: 'password',
        //     client_id: clientId,
        //     client_secret: clientSecret,
        //     username: this.form.email,
        //     password: this.form.password,
        //     captcha: this.form.captcha,
        //     scope: ''
        // }
        const authUser = {}
        this.form.post(loginUrl)
          .then(response => {
            if (response.status === 200) {
              console.log(response)
              this.$root.$children[0].isAuth = true
              this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now())
              this.$http.get(userUrl, {headers: getHeader()})
                .then(response => {
                  window.localStorage.setItem('authUser', JSON.stringify(response.body))
                  this.$store.dispatch('setUserObject', response.body)
                  this.$router.push({name: 'dashboard'})
                })
            }
          })
      }
    }
  }
</script>


<template>
  <div>
    <!-- Page container -->
	<div class="page-container">

		<!-- Page content -->
		<div class="page-content">

			<!-- Main content -->
			<div class="content-wrapper">

				<!-- Content area -->
				<div class="content">

					<!-- Advanced login -->
          <form @submit.prevent="handleLoginFormSubmit" @keydown="form.errors.clear($event.target.name)">
            <div class="panel panel-body login-form">
              <alert-errors :form="form" message=""></alert-errors>
              <div class="text-center">
                <div class="icon-object border-slate-300 text-slate-300"><i class="icon-enter"></i></div>
                <h5 class="content-group">Faça login na sua conta <small class="display-block">Informe suas credenciais</small></h5>
              </div>

              <div class="form-group has-feedback has-feedback-left" :class="{ 'has-error': form.errors.has('email') }">
                <input type="text" class="form-control" v-model="form.email" placeholder="Email">
                <div class="form-control-feedback">
                  <i class="icon-user text-muted"></i>
                </div>
                <has-error :form="form" field="email"></has-error>
              </div>

              <div class="form-group has-feedback has-feedback-left" :class="{ 'has-error': form.errors.has('password') }">
                <input type="password" class="form-control" v-model="form.password" placeholder="Password">
                <div class="form-control-feedback">
                  <i class="icon-lock2 text-muted"></i>
                </div>
                <has-error :form="form" field="password"></has-error>
              </div>


              <div class="form-group login-options">
                <div class="row">
                  <!-- <div class="col-sm-12"> -->
                    <vue-recaptcha :sitekey="key" @verify="onVerify" @expired="onExpired"></vue-recaptcha>
                    <br>
                  <!-- </div> -->
                  <div class="col-sm-6">
                    <label class="checkbox-inline">
                      <input type="checkbox" class="styled" checked="checked">
                      Lembrar-me
                    </label>
                  </div>

                  <div class="col-sm-6 text-right">
                    <router-link :to="{ name: 'forgot-password' }">Esqueci a senha</router-link>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button type="submit" data-style="expand-right" :disabled="form.busy || form.captcha == ''" class="btn bg-blue btn-block ladda-button"><span class="ladda-label">Login</span><i class="icon-arrow-right14 position-right"></i></button>
              </div>

            </div>
          </form>
          <!-- /advanced login -->

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

<style lang="sass">

</style>
