<template>
  <div class="col-lg-12">
    <div class="panel panel-default">
      <div class="panel-heading">
        {{ title }}
      </div>

      <div class="panel-body">
        <div class="table-responsive">
          <table class="table table-bordered table-hover" v-bind:id="id" v-bind:items="items">
            <thead>
              <tr>
                <th v-for="h in headers">
                  {{ h.header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <slot></slot>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '-'
    },
    id: {
      type: String,
      required: true,
      default: '-'
    },
    headers: {
      type: Array,
      required: true,
      default: []
    },
    url: {
      type: String,
      required: true,
      default: '-'
    }
  },
  mounted() {
    // $('#table1 tfoot th').each(function () {
    //   var title = $(this).text()
    //   $(this).html('<input type="text" placeholder="Search ' + title + '" />')
    // })
  },
  methods: {
    carregar() {
      // var self = this
      // self.data_table = $('#' + self.id).DataTable({
      //   dom: 'lBfrtip',
      //   buttons: ['csv', 'excel', 'pdf', 'print', 'copy'],
      //   colReorder: true,
      //   responsive: true
      // })
    }
  }

}
</script>

<style lang="css">
</style>
