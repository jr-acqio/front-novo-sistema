<template>
  <div class="col-lg-12">
    <div class="panel panel-default">
      <div class="panel-heading">
        {{ title }}
      </div>

      <div class="panel-body">
        <table class="table table-bordered table-hover" v-bind:id="id" v-bind:items="items">
          <thead>
            <tr>
              <th v-for="h in headers">
                {{ h.header }}
              </th>
            </tr>
          </thead>
        </table>
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
    columns: {
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
    var self = this
    var tam = self.columns.length - 1
    self.data_table = $('#' + self.id).DataTable({
      dom: 'lBfrtip',
      buttons: ['csv', 'excel', 'pdf', 'print', 'copy'],
      // processing: true,
      // serverSide: true,
      colReorder: true,
      responsive: true,
      ajax: {
        'url': self.url,
        'type': 'GET'
      },
      columnDefs: [
        {
          render: function(data, type, row) {
            return `
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:void(0)" data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false"><i class="icon-menu9"></i></a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li id="btnEdit">
                    <a href="javascript:void(0)"><i class="icon-pencil7"></i> Editar</a>
                  </li>
                  <li id="btnView">
                    <a href="#"><i class="icon-folder-search"></i> Visualizar</a>
                  </li>
                  <li id="btnDelete">
                    <a href="#"><i class="icon-cross2"></i> Excluir</a>
                  </li>
                </ul>
              </li>
            </ul>
            `
          },
          targets: tam
        }
      ],
      columns: self.columns
    })
  }

}
</script>

<style lang="css">
</style>
