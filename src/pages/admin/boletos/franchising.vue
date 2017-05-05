<template>
  <div class="">
    <!-- <el-button type="primary" :loading="true">Loading</el-button> -->

    <el-dialog v-if="dialogVisible" title="Solicitação de Boleto - Via Franchising" v-model="dialogVisible" size="large" :before-close="handleClose">
      <div class="row">
        <div class="col-lg-4">
          <div class="form-group">
            <label for="">Nome do Cliente</label>
            <input type="text" disabled :value="rowView.nome_cliente.toUpperCase()" class="form-control">
          </div>
        </div>
        <div class="col-lg-2">
          <div class="form-group">
            <label for="">Documento</label>
            <input type="text" disabled v-model="rowView.documento" class="form-control" value="">
          </div>
        </div>
        <div class="col-lg-2 pull-right" style="margin-top: 28px;">
          <button type="button" @click="viewProducts == true ? viewProducts = false : viewProducts = true" class="btn btn-primary" name="button">
            <span v-if="viewProducts"><b>Esconder Produtos</b>&nbsp<i class="icon-zoomout3"></i></span>
            <span v-else><b>Visualizar Produtos</b>&nbsp<i class="icon-search4"></i></span>
          </button>
        </div>
        <div class="col-lg-2 pull-right">
          <div class="form-group">
            <label for="">Solicitado em:</label>
            <input type="text" disabled class="form-control" :value="date(rowView.created_at)">
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-lg-1">
          <div class="form-group">
            <label for="">UF</label>
            <input type="text" disabled v-model="rowView.uf" class="form-control" value="">
          </div>
        </div>
        <div class="col-lg-2">
          <div class="form-group">
            <label for="">Cidade</label>
            <input type="text" disabled v-model="rowView.cidade" class="form-control" value="">
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group">
            <label for="">Bairro</label>
            <input type="text" disabled v-model="rowView.bairro" class="form-control" value="">
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group">
            <label for="">Logradouro</label>
            <input type="text" disabled v-model="rowView.logradouro" class="form-control" value="">
          </div>
        </div>
        <div class="col-lg-1">
          <div class="form-group">
            <label for="">Número</label>
            <input type="text" disabled v-model="rowView.numero" class="form-control" value="">
          </div>
        </div>
        <div class="col-lg-2">
          <div class="form-group">
            <label for="">CEP</label>
            <input type="text" disabled v-model="rowView.cep" class="form-control" value="">
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-lg-2">
          <div class="form-group">
            <label for="">Valor do Boleto R$</label>
            <input type="text" disabled class="form-control" :value="formatNumber(somaProduto(rowView))">
          </div>
        </div>
        <div class="col-lg-2">
          <div class="form-group">
            <el-tooltip content="Número gerado pelo sistema de boletos.acqio.co" placement="top">
              <label style="cursor: pointer" for="">Número do Documento <i class="icon-question7"></i></label>
            </el-tooltip>
            <input type="text" disabled v-model="rowView.numero_boleto" class="form-control" value="">
          </div>
        </div>
        <div class="col-lg-2">
          <div class="form-group">
            <el-tooltip content="Número gerado pela plataforma BOLETO CLOUD" placement="top">
              <label style="cursor: pointer" for="">Nosso Número <i class="icon-question7"></i></label>
            </el-tooltip>
            <input type="text" disabled v-model="rowView.nosso_numero" class="form-control" value="">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="">Link download 2º Via</label>
            <div class="input-group">
              <input type="text" disabled :value="urlDownloadBoleto(rowView.token)" class="form-control">
              <span class="input-group-btn">
                <el-tooltip content="Clique para realizar o Download" placement="top">
                  <a target="_blank" :href="urlDownloadBoleto(rowView.token)" class="btn bg-primary" type="button">
                    <i class="icon-download"></i>
                  </a>
                </el-tooltip>
              </span>
            </div>
          </div>
        </div>
        <div v-if="viewProducts">
          <div class="col-lg-2" v-for="p in rowView.franchising.produtos">
            <div class="form-group">
              <label for="">{{p.produto.descricao}}</label>
              <input type="text" disabled class="form-control" :value="p.quantidade">
            </div>
          </div>
          <div class="col-lg-2">
            <div class="form-group">
              <label for="">Total de Produtos</label>
              <input type="text" disabled class="form-control" :value="totalProdutos(rowView)">
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row" v-if="rowView.franchising.idfda != null">

          <div class="col-lg-4">
            <div class="form-group">
              <label for="">Solicitante</label>
              <div>
                  <input  type="text" disabled v-model="rowView.franchising.fda.nome_razao" class="form-control">
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group">
              <label for="">Identificador</label>
              <div>
                  <input  type="text" disabled v-model="rowView.franchising.fda.fdaid" class="form-control">
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="form-group">
              <label for="">Email</label>
              <div>
                  <input type="text" disabled v-model="rowView.franchising.fda.email" class="form-control">
              </div>
            </div>
          </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Fechar</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">Confirm</el-button> -->
      </span>
    </el-dialog>

    <datatable-slot
    title="Boletos - Franchising"
    id="table1"
    v-loading.body="loading"
    url="http://localhost:8000/api/teste"
    :headers="[
    { header: '#' },
    /*{ header: 'Id' },*/
    { header: 'Nome' },
    { header: 'Documento' },
    { header: 'Valor R$' },
    { header: 'Data de Solicitação'},
    { header: 'Solicitante'},
    { header: 'Ações' }
    ]">
    <tr v-for="(row, index) in rows.data">
      <td>{{ index + 1 }}</td>
      <!-- <td>{{ row.id }}</td> -->
      <td>{{ row.nome_cliente.toUpperCase() }}</td>
      <td>{{ row.documento }}</td>
      <td>{{ formatNumber(somaProduto(row)) }}</td>
      <td>{{ date(row.created_at) }}</td>

      <td>
        {{ row.franchising.fda.nome_razao }}
      </td>
      <td sortable="false">
        <ul class="icons-list">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="icon-menu9"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-right">
              <!-- <li @click="onAction('edit-item', index + 1)"><a href="javascript:void(0)"><i class="icon-pencil7"></i> Editar</a></li> -->
              <li @click="onAction('view-item', index)"><a href="javascript:void(0)"><i class="icon-folder-search"></i> Visualizar</a></li>
              <!-- <li @click="onAction('delete-item', index + 1)"><a href="javascript:void(0)"><i class="icon-cross2"></i> Excluir</a></li> -->
              <li @click="onAction('download', index)">
                <a target="_blank" :href="urlDownloadBoleto(row.token)"><i class="icon-barcode2"></i> Download Boleto</a>
              </li>
            </ul>
          </li>
        </ul>
      </td>
    </tr>
  </datatable-slot>
  </div>
</template>

<script>
import accounting from 'accounting'
import { fetchAllBoletoFranchising } from './../../../services/api'
import { boletosClienteUrl, boletosDownloadUrl } from './../../../services/config'
export default {
  data() {
    return {
      loading: true,
      rows: '',
      rowView: '',
      dialogVisible: false,
      viewProducts: false
    }
  },
  mounted() {
    console.log(this.$route)
    fetchAllBoletoFranchising().then(response => {
      this.rows = response
      setTimeout(function() {
        this.data_table = $('#' + 'table1').DataTable({
          dom: 'lBfrtip',
          buttons: ['csv', 'excel', 'pdf', 'print', 'copy'],
          colReorder: true,
          responsive: true
        })
      }, 100)
      this.loading = false
    }).catch(error => {
      console.log(error)
    })
  },
  created() {
    this.$nextTick(function () {
      // $.getScript('/static/assets/js/core/app.js')
      // $.getScript('/static/assets/js/pages/dashboard.js')
    })
  },
  methods: {
    date (val) {
      return moment(val).format('DD/MM/YYYY HH:mm:ss')
    },
    formatNumber (value) {
      return 'R$ ' + accounting.formatNumber(value, 2)
    },
    totalProdutos(row) {
      let soma = 0
      let produtos = row.franchising.produtos
      for (var i in produtos) {
        soma += produtos[i].quantidade
      }
      return soma
    },
    somaProduto(row) {
      let soma = 0
      if (row.hasOwnProperty('franchising') && row.franchising.hasOwnProperty('produtos')) {
        let produtos = row.franchising.produtos
        for (var i in produtos) {
          soma += produtos[i].quantidade * (produtos[i].produto.valor - produtos[i].produto.desconto)
        }
      }
      return soma
    },
    urlDownloadBoleto(token) {
      return boletosDownloadUrl + token
    },
    onAction (action, rowIndex) {
      this.dialogVisible = true
      this.rowView = this.rows.data[rowIndex]
    }
  }
}

</script>

<style lang="css">
</style>
