<template>
  <div class="">
    <!-- <el-table v-loading.body="fetching" :data="products" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="customer.name" label="Cliente"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="navigate" :current-page="pagination.current_page" :page-size="pagination.per_page" layout="total, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div> -->

    <div class="panel panel-default">
      <div class="panel-heading">
        Faturas Vindi
      </div>

      <div class="panel-body">
        <div class="table-responsive">
          <table v-loading.body="loading" class="table table-bordered table-hover" id="table1">
            <thead>
              <tr>
                <th>Id</th>
                <th>Cliente</th>
                <th>Valor R$</th>
                <th>Status</th>
                <th>Valor PAGO</th>
                <th>Saldo Devedor</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import accounting from 'accounting'
import { mapActions, mapState } from 'vuex'
import { vindiBills } from '../../../../services/config'
import { http } from 'plugins/http'
import _ from 'lodash'
export default {
  metaInfo: {
    titleTemplate: '%s - Faturas Vindi'
  },
  watch: {
    // call again the method if the route changes
    currentPage: 'fetch',
  },
  data() {
    return {
      loading: true
    }
  },
  created() {
    var me = this
    me.loading = true
    setTimeout(function() {
      self.dtHandle = $('#' + 'table1').DataTable({
        "serverSide": true,
        "processing": true,
        "ajax": {
          "url": vindiBills,
          "type": "GET",
          "headers": {
            "Authorization": "Bearer " + me.$store.state.Auth.token
          }
        },
        "columns": [
            { "data": "id" },
            { "data": "customer.name" },
            { "data": "amount",
              render: function (data, type, row) {
                return 'R$ ' + accounting.formatNumber(data, 2)
              }
            },
            { "data": "status",
              render: function (data, type, row) {
                // alert(data === 'paid')
                if (data === 'paid') {
                  return '<span class="label bg-success">PAGO</span>'
                } else {
                  return '<span class="label bg-danger">PENDENTE</span>'
                }
              }
            },
            { "data": "charges",
              render: function (data, type, row) {
                return 'R$ ' + accounting.formatNumber(_.reduce(row.charges, function(sum, n) {
                  if (n.status === "paid") {
                      return sum + parseFloat(n.amount)
                  } else {
                    return sum + 0
                  }
                }, 0), 2)
              }
            },
            { "data": "charges",
              render: function (data, type, row) {
                return 'R$ ' + accounting.formatNumber(_.reduce(row.charges, function(sum, n) {
                  if (n.status === "pending") {
                      return sum + parseFloat(n.amount)
                  } else {
                    return sum + 0
                  }
                }, 0), 2)
              }
            }
            // { "data": "salary" }
        ]
      })
      me.loading = false
    }, 1000)
  },
  methods: {
    ...mapActions(['productsSetData', 'setFetching']),
    /**
    * Fetch a new set of products
    * based on the current page
    */
    fetch() {
      /**
      * Vuex action to set fetching property
      * to true, thus showing the spinner
      * that is part of navbar.vue
      */
      this.setFetching({ fetching: true })
      /**
      * Makes the HTTP request to the API
      * $http is a Vue.js plugins exposing
      * an Axios object.
      * See /src/plugins/http.js
      */
      // console.log(vindiBills)
      this.$http.get(`${vindiBills}?page=${this.currentPage}`).then(({ data }) => {
        /**
        * Vuex action to set pagination object in
        * the Vuex Products module
        */
        this.productsSetData({
          list: data.data,
          pagination: data.meta.pagination,
        })
        /**
        * Vuex action to set fetching property
        * to false, thus hiding the spinner
        * that is part of navbar.vue
        */
        this.setFetching({ fetching: false })
      })
    },
    /**
    * Navigate to a specific page, provided in the
    * obj received by the method
    */
    navigate(page) {
      /**
      * Push the page number to the query string
      */
      this.$router.push({ name: 'vindi.bills', query: { page } })
    }
  },
  /**
  * mapState will bring indicated Vuex
  * state properties to the scope of this component.
  */
  computed: {
    ...mapState({
      fetching: state => state.fetching,
      pagination: state => state.Products.pagination,
      list: state => state.Products.list,
    }),
    products() {
      return this.list
    },
    currentPage() {
      return parseInt(this.$route.query.page, 10) || 1
    }
  },
  /**
    * Right before navigate out to another route
    * clears all event handlers, thus avoiding
    * multiple handlers to be set and the annoying
    * behaviour of multiple AJAX calls being made.
    */
    beforeRouteLeave(to, from, next) {
      this.$bus.$off('product.created')
      this.$bus.$off('product.updated')
      jQuery('body').off('keyup')
      next()
    },
    mounted() {
      /**
      * Product was created or updated, refresh the list
      */
      this.$bus.$on('product.created', () => this.fetch())
      this.$bus.$on('product.updated', () => this.fetch())
      /**
      * Fetch data immediately after component is mounted
      */
      // this.fetch()
    }
}
</script>

<style lang="css">
</style>
