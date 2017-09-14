<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      Gerar novo BoletoSimples
    </div>
    <div class="panel-body">
      <form v-loading="loading" @submit.prevent="gerarBoleto" @keydown="form.errors.clear($event.target.name)">
        <alert-errors :form="form" classe="alert bg-danger alert-styled-left" message=""></alert-errors>
        <alert-success :form="form" classe="alert bg-success alert-styled-left" message="Boleto gerado com sucesso!"></alert-success>
        <div class="row">
          <div class="form-group col-lg-6" :class="{ 'has-error': form.errors.errors.customer_person_name }">
            <label>Nome do Cliente</label>
            <input type="text" v-model="form.customer_person_name" class="form-control">
            <span class="help-block">{{ printError(form.errors.errors.customer_person_name) }}</span>
          </div>
          <div class="form-group col-lg-6" :class="{ 'has-error': form.errors.errors.customer_email }">
            <label>Email</label>
            <input type="email" v-model="form.customer_email" class="form-control">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-6" :class="{ 'has-error': form.errors.errors.customer_phone_number }">
            <label>Telefone</label>
            <input type="email" placeholder="Exemplo: (99) 9 9999-9999" v-mask="['(##) 9 ####-####']" v-model="form.customer_phone_number" class="form-control">
          </div>
          <div class="form-group col-lg-3" :class="{ 'has-error': form.errors.errors.customer_cnpj_cpf }">
            <label>CPF/CNPJ</label><br>
            <input type="text" v-model="form.customer_cnpj_cpf" v-mask="['###.###.###-##', '##.###.###/####-##']" class="form-control">
            <span class="help-block">{{ printError(form.errors.errors.customer_cnpj_cpf) }}</span>
          </div>

          <div class="form-group col-lg-3">
            <label>CEP</label>
            <input @blur="loadCep" type="text" class="form-control" v-mask="'#####-###'" name="cep" value="" v-model="form.customer_zipcode">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-3">
            <label>Cidade</label>
            <input type="text" class="form-control" value="" v-model="form.customer_city_name">
          </div>
          <div class="form-group col-lg-3">
            <label>Bairro</label>
            <input type="text" class="form-control" value="" v-model="form.customer_neighborhood">
          </div>
          <div class="form-group col-lg-3">
            <label>Endereço</label>
            <input type="text" class="form-control" value="" v-model="form.customer_address">
          </div>
          <div class="form-group col-lg-3">
            <label>UF</label>
            <input type="text" maxlength="2" class="form-control" value="" v-model="form.customer_state">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-3">
            <label>Complemento</label>
            <input type="text" class="form-control" value="" v-model="form.customer_address_complement">
          </div>
          <div class="form-group col-lg-3">
            <label>Numero</label>
            <input type="text" class="form-control" value="" v-model="form.customer_address_number">
          </div>

          <div class="form-group col-lg-3">
            <label>Valor R$</label>
            <money v-model="form.amount" class="form-control" v-bind="money"></money>
          </div>

          <div class="form-group col-lg-3" :class="{ 'has-error': form.errors.errors.expire_at}">
            <label>Data de Vencimento</label><br>
            <el-date-picker v-model="form.expire_at" type="date" placeholder="Escolha uma data" format="dd/MM/yyyy" :picker-options="pickerOptions1"></el-date-picker>
            <span class="help-block">{{ printError(form.errors.errors.expire_at) }}</span>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-12">
            <label>Descrição</label>
            <textarea name="name" rows="10" cols="80" class="form-control" v-model="form.description"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-12">
            <button type="submit" class="btn btn-primary">Criar </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Form } from 'vform'
import axios from 'axios'
import _ from 'lodash'
import { http } from 'plugins/http'
import { fetchAllBoletoCliente } from './../../../services/api'
import { boletoSimples } from './../../../services/config'
export default {
  metaInfo: {
    titleTemplate: '%s - Gerar BoletoSimples'
  },
  data() {
    return {
      loading: false,
      form: new Form({
        amount: '',
        description: '',
        expire_at: '',
        customer_address: '',
        customer_address_complement: '',
        customer_address_number: '',
        customer_city_name: '',
        customer_cnpj_cpf: '',
        customer_email: '',
        customer_neighborhood: '',
        customer_person_name: '',
        customer_person_type: '',
        customer_phone_number: '',
        customer_state: '',
        customer_zipcode: ''
      })
    }
  },
  methods: {
    printError(array) {
      return _.join(array, ", ")
    },
    gerarBoleto() {
      this.$Progress.start()
      this.form.post(boletoSimples).then(response => {
        this.$Progress.finish()
        // this.clearForm()
        swal("Boleto gerado!", "", "success")
      }).catch(response => {
        this.$Progress.fail()
        console.log(response)
      })
    },
    loadCep() {
      let vm = this
      this.$Progress.start()
      $.ajax({
        url: "https://viacep.com.br/ws/" + vm.form.customer_zipcode + "/json/",
        success: function(data) {
          console.log(data)
          vm.form.customer_city_name = data.localidade
          vm.form.customer_neighborhood = data.bairro
          vm.form.customer_state = data.uf
          vm.form.customer_address = data.logradouro
          vm.$Progress.finish()
        },
        error: function() {
          vm.$Progress.fail()
          swal("", "CEP Inválido!", "error")
        }
      })
    }
  }
}

</script>

<style scoped="">
body {
  margin: 0;
}
</style>
