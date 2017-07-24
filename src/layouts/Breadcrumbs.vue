<template lang="html">
  <!-- Page header -->
  <div class="page-header page-header-default">
    <!-- <nav class="breadcrumbs" v-if="$breadcrumbs.length">
      <ul>
        <li v-for="(crumb, i) in $breadcrumbs">
          <router-link :to=" { path: crumb.path }">{{ crumb.meta.breadcrumb }}</router-link>
        </li>
      </ul>
    </nav> -->
    <div class="breadcrumb-line">
      <ul class="breadcrumb">
        <li v-for="(crumb, i) in $breadcrumbs" :class="{ 'active' : $route.path === crumb.path }">
          <template v-if="$route.path === crumb.path">
            <i :class="crumb.meta.breadcrumb.icon"></i> {{ crumb.meta.breadcrumb.name }}
          </template>
          <template v-else>
            <router-link :to=" { path: crumb.path }">
              <i :class="crumb.meta.breadcrumb.icon"></i> {{ crumb.meta.breadcrumb.name }}
            </router-link>
          </template>
        </li>
        <!-- <li class="active">Dashboard</li> -->
      </ul>

      <!-- <ul class="breadcrumb-elements">
        <li><a href="#"><i class="icon-comment-discussion position-left"></i> Support</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <i class="icon-gear position-left"></i>
            Settings
            <span class="caret"></span>
          </a>

          <ul class="dropdown-menu dropdown-menu-right">
            <li><a href="#"><i class="icon-user-lock"></i> Account security</a></li>
            <li><a href="#"><i class="icon-statistics"></i> Analytics</a></li>
            <li><a href="#"><i class="icon-accessibility"></i> Accessibility</a></li>
            <li class="divider"></li>
            <li><a href="#"><i class="icon-gear"></i> All settings</a></li>
          </ul>
        </li>
      </ul> -->
    </div>
  </div>
  <!-- /page header -->
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
