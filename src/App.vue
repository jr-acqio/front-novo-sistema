<script>
import {mapState} from 'vuex'
import { getHeader } from './services/config'
export default {
  metaInfo: {
    title: 'Acqio'
  },
  components: {
    // VsFooter
  },
  computed: {
    ...mapState({
      userStore: state => state.userStore
    })
  },
  data() {
    return {
      isAuth: null
    }
  },
  mounted () {
    this.$loading = this.$refs.loading
  },
  created () {
    this.isAuth = this.$auth.isAuthenticated()
    const userObj = JSON.parse(window.localStorage.getItem('authUser'))
    if (userObj) {
      this.$store.dispatch('setUserObject', userObj)
    }
    // Loading
    // this.$root.$loading = this
  },
  sockets: {
    connect () {
      console.log('socket connected')
    }
  },
  methods: {
    handleLogout () {
      this.isAuth = false
      this.$auth.destroyToken()
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<template>
  <div>
    <loading ref="loading"></loading>

    <!-- Main navbar -->
    <div class="navbar navbar-inverse">
      <div class="navbar-header">
        <router-link :to="{ name: 'home' }" style="padding: 10px 10px !important;" :class="{ 'navbar-brand' : true }">
          <img src="/static/assets/images/acqio-login.png" style="height: 30px;" alt="" class="img-responsive">
        </router-link>

        <ul v-if="isAuth" class="nav navbar-nav visible-xs-block">
          <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
          <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
      </div>

      <div v-if="isAuth" class="navbar-collapse collapse" id="navbar-mobile">
        <ul class="nav navbar-nav">
          <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>

        <p class="navbar-text"><span class="label bg-success">Online</span></p>

        <ul class="nav navbar-nav navbar-right">

          <li class="dropdown dropdown-user">
            <a class="dropdown-toggle" data-toggle="dropdown">
              <img src="/static/assets/images/demo/users/face0.jpg" alt="">
              <span>{{userStore.authUser.name}}</span>
              <i class="caret"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-right">
              <li><a href="#" v-on:click="handleLogout()"><i class="icon-switch2"></i> Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- /main navbar -->


    <template v-if="!isAuth">
      <child></child>
    </template>

    <template v-else>
      <!-- Page container -->
      <div class="page-container">

        <!-- Page content -->
        <div class="page-content">
          <sidebar-nav></sidebar-nav>
          <!-- Main content -->
          <div class="content-wrapper">
            <breadcrumb></breadcrumb>

            <!-- Content area -->
            <div class="content">

              <child></child>

              <!-- Footer -->
              <vs-footer></vs-footer>
              <!-- /footer -->
            </div>

            <!-- /dashboard content -->

          </div>
          <!-- /content area -->

          <!-- /main content -->

        </div>
        <!-- /page content -->
      </div>
      <!-- /page container -->
    </template>

  </div>
</template>

<style lang="scss">
@import '~/static/assets/css/icons/icomoon/styles.css';
@import '~/static/assets/css/bootstrap.css';
@import '~/static/assets/css/colors.css';
@import '~/static/assets/css/core.css';
@import '~/static/assets/css/components.css';
//@import '~/static/assets/css/icons/fontawesome/styles.min.css';
body {
  font-family: 'Rajdhani';
}
</style>
