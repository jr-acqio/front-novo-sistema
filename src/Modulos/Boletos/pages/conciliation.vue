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
          <alert-success :form="form" :message="msg"></alert-success>
          <alert-errors :form="form" message=""></alert-errors>
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
import { getHeader, conciliationBoletosUrl } from './../../../services/config'
export default {
  data() {
    return {
      form: new Form({
        file: ''
      }),
      msg: '',
      loading: false
      // progress: 0,
      // submitForm: false
    }
  },
  methods: {
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
        this.msg = response.data
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
