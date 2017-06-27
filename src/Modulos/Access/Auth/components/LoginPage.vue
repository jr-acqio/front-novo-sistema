<script>
  import {loginUrl, getHeader, userUrl} from './../../../../services/config'
  import {mapState, mapActions} from 'vuex'
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
        $.getScript('https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
        $('body').addClass('login-container')
      })
    },
    computed: {
      // ...mapState({
      //   userStore: state => state.userStore
      // })
    },
    data () {
      return {
        form: new Form({
          captcha: '',
          email: 'joselito.junior@esfera5.com.br',
          password: 'password'
        }),
        key: '6LcOVB8UAAAAAFuiPdmlj_IKgmqYVIfO7gfHUPs3',
        msgButtonSubmit: 'Login <i class="icon-arrow-right14 position-right"></i>',
        loading: false
      }
    },
    methods: {
      ...mapActions(['attemptLogin', 'setMessage']),
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
        this.loading = true
        this.msgButtonSubmit = 'Aguarde...  <i class="el-icon-loading"></i>'
        var self = this
        const { email, password } = this.form // http://wesbos.com/destructuring-objects/
        this.attemptLogin({ email, password }) // this is a Vuex action
          .then((response) => {
            // console.log("Deu SUCESSO!", response)
            this.setMessage({ type: 'error', message: [] }) // this is a Vuex action
            this.$router.push('/home')
            // this.$router.push({ name: 'home' })
          }, (error) => {
              // console.log("Deu FALHA!", error)
              this.form.errors.set(error.response.data)
              this.loading = false
              this.msgButtonSubmit = 'Login <i class="icon-arrow-right14 position-right"></i>'
          })
          // .catch(error => {
          //   console.log("Deu FALHA!", JSON.parse(error))
          //   this.form.errors.set(error.response.data)
          //   this.loading = false
          //   this.msgButtonSubmit = 'Login <i class="icon-arrow-right14 position-right"></i>'
          // })
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


              <div class="form-group">
                <div class="row">
                  <!-- <div class="col-sm-12"> -->
                    <!-- <vue-recaptcha :sitekey="key" @verify="onVerify" @expired="onExpired"></vue-recaptcha> -->
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
                <button type="submit" data-style="expand-right" :disabled="form.busy" class="btn bg-blue btn-block">
                  <span v-html="msgButtonSubmit"></span>
                </button>
                <!-- <button type="submit" data-style="expand-right" :disabled="form.busy || form.captcha == ''" class="btn bg-blue btn-block">
                  <span v-html="msgButtonSubmit"></span>
                </button> -->
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

<style scoped="">
.login-container{
  padding: 0px !important;
}
.content {
  padding: 0px !important;
}
</style>
