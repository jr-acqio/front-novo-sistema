<template>
  <div class="">
    <div class="panel panel-default">
      <div class="panel-heading">
        Conciliação
      </div>
      <div class="panel-body">
        <div class="form-group">
          <!-- <el-progress :percentage="70" :stroke-width="22"></el-progress> -->
          <!-- <el-progress :percentage="50" :stroke-width="22" status="success"></el-progress> -->
          <el-progress :text-inside="true" :stroke-width="22" status="info" :percentage="progress"></el-progress>
        </div>
        <form @keydown="form.errors.clear($event.target.name)" enctype="multipart/form-data">
          <div v-if="form.successful" class="alert alert-success alert-styled-left alert-arrow-left alert-bordered">
    				<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>
    				<span class="text-semibold">{{msg}}</span>
			    </div>
          <!-- <alert-success :form="form" :message="msg"></alert-success> -->
          <alert-errors :form="form" message=""></alert-errors>
          <div v-if="info && form.successful">
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
import { http } from 'plugins/http'
import axios from 'axios'
export default {
  data() {
    return {
      form: new Form({
        file: ''
      }),
      msg: '',
      info: '',
      loading: false,
      progress: 0,
      submitForm: false
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
      let self = this
      this.loading = true
      this.progress = 0
      var data = new FormData();
      data.append('file', this.form.file)
      var config = {
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          self.progress = percentCompleted
          console.log(percentCompleted)
        }
      }
      axios.post(conciliationBoletosUrl, data, config).then(response => {
        this.form.successful = true
        this.form.errors.set({})
        this.msg = response.data.msg
        this.info = response.data.info
        $('input[type="file"]').val('')
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error.response)
        this.form.errors.set(error.response.data)
        this.form.successful = false
      })
    }
  }
}
</script>

<style lang="css">
</style>
