<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import { getHeader } from './services/config'
export default {
  metaInfo: {
    title: 'Acqio'
  },
  components: {
    // VsFooter
  },
  computed: {
    // ...mapState({
    //   // userStore: state => state.userStore,
    //   // accessStore: state => state.accessStore
    // })
    ...mapGetters(['isLogged']),
    ...mapState({
      user: state => state.Auth.user
    })
  },
  data() {
    return {
    }
  },
  mounted () {
    this.$loading = this.$refs.loading
  },
  created () {
  },
  sockets: {
    connect () {
      console.log('socket connected')
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout () {
      this.logout()      // this.isAuth = false
      // this.$auth.destroyToken()
      // this.$router.push({name: 'home'})
    }
  }
}
</script>

<template>
  <div>
    <loading ref="loading"></loading>

    <!-- Main navbar -->
    <div v-if="isLogged" class="navbar navbar-inverse">
      <div class="navbar-header">
        <router-link :to="{ name: 'home' }" style="padding: 7px !important;" :class="{ 'navbar-brand' : true }">
          <img src="/static/assets/images/acqio-login.png" style="height: 30px;" alt="" class="img-responsive">
        </router-link>

        <ul class="nav navbar-nav visible-xs-block">
          <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
          <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
      </div>

      <div class="navbar-collapse collapse" id="navbar-mobile">
        <ul class="nav navbar-nav">
          <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>

        <p class="navbar-text"><span class="label bg-success">Online</span></p>

        <ul class="nav navbar-nav navbar-right">

          <li class="dropdown dropdown-user">
            <a class="dropdown-toggle" data-toggle="dropdown">
              <img src="/static/assets/images/demo/users/face0.jpg" alt="">
              <span>{{user.name}}</span>
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


    <template v-if="!isLogged">
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
              <!-- <dashboard></dashboard> -->

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

<style scoped>

</style>
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
.el-loading-spinner .circular{
  margin-left: 50%;
}
</style>
