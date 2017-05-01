import * as config from './config'
import axios from 'axios'
export function fetchAllBoletoCliente () {
	return new Promise((resolve, reject) => {
		var data
    axios.get(config.boletosClienteUrl).then(response => {
      data = response.data
      resolve(data)
    }, response => {
      console.log(response)
			reject()
    })
	})
}
export function fetchAllBoletoFranchising () {
	return new Promise((resolve, reject) => {
		var data
    axios.get(config.boletosFranchisingUrl).then(response => {
      data = response.data
      resolve(data)
    }, response => {
      console.log(response)
			reject()
    })
	})
}
