<template>
  <div class="">
    <div class="panel panel-default">
      <div class="panel-heading">
        Conciliação
      </div>
      <div class="panel-body">
        <!-- <div class="form-group" v-if="submitForm">
          <el-progress :text-inside="true" :stroke-width="22" status="info" :percentage="progress"></el-progress>
        </div> -->
        <form @keydown="form.errors.clear($event.target.name)" enctype="multipart/form-data">
          <div v-if="msg" class="alert alert-success alert-styled-left alert-arrow-left alert-bordered">
    				<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>
    				<span class="text-semibold">{{msg}}</span>
			    </div>
          <!-- <alert-success :form="form" :message="msg"></alert-success> -->
          <alert-errors :form="form" message=""></alert-errors>
          <div v-if="info">
            <p>Foram encontrados {{ info.length }} <span v-if="info.length>1">boletos pagos.</span><span v-else>boleto pago.</span></p>
            <table class="table table-bordered table-hover table-stripped">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Documento</th>
                  <th>Nosso Numero</th>
                  <th>Valor</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="i in info">
                  <td>{{ i.nome_cliente }}</td>
                  <td>{{ i.documento }}</td>
                  <td>{{ i.nosso_numero }}</td>
                  <td>{{ formatNumber(i.valor) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br>

          <div class="form-group">
            <label>Arquivo Retorno</label>
            <input type="file" v-on:change="file" class="file-styled">
          </div>
          <div class="form-group">
            <el-button :loading="loading" @click.prevent="submit" type="primary"><b>Upload</b> <i class="el-icon-upload el-icon-right"></i></el-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form } from 'vform'
import accounting from 'accounting'
import { getHeader, conciliationBoletosUrl } from './../../../services/config'
export default {
  data() {
    return {
      form: new Form({
        file: ''
      }),
      msg: '',
      info: '',
      loading: false
      // progress: 0,
      // submitForm: false
    }
  },
  methods: {
    formatNumber (value) {
      return 'R$ ' + accounting.formatNumber(value, 2)
    },
    file(e) {
      // console.log(e.target.files[0] instanceof FileList || e.target.files[0] instanceof Blob)
      this.form.file = e.target.files[0]
    },
    submit() {
      this.loading = true
      // this.submitForm = true
      let self = this
      this.form.post(conciliationBoletosUrl).then(response => {
        console.log(response)
        this.msg = response.data.msg
        this.info = response.data.info
        $('input[type="file"]').val('')
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    }
  }
}
</script>

<style lang="css">
</style>
