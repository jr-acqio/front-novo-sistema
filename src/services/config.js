// Configurações
var apiDomain
if (process.env.NODE_ENV !== 'development') {
  apiDomain = 'https://dev.acqio.co/'
} else {
  apiDomain = 'http://localhost:8000/'
}

const version = 'api/'

// Rotas do Passport Auth
export const loginUrl = apiDomain + version + 'authenticate'
export const userUrl = apiDomain + 'api/user'
export const forgotPassword = apiDomain + 'api/forgot-password'
export const resetPassword = apiDomain + 'api/reset-password'

// Rotas de api
export const userListUrl = apiDomain + version + 'users-list'

export const getHeader = function () {
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + tokenData.token
  }
  return headers
}

// Api acqio boletos
var boletosDomain
var boletosDownload
if (process.env.NODE_ENV !== 'development') {
  boletosDomain = 'https://boletos.acqio.co/'
  boletosDownload = 'https://app.boletocloud.com/boleto/2via/download/'
} else {
  boletosDomain = 'http://localhost:8081/'
  boletosDownload = 'https://sandbox.boletocloud.com/boleto/2via/download/'
}

export const boletosVersion = 'api/v1/'
export const boletosDownloadUrl = boletosDownload
export const boletosClienteUrl = boletosDomain + boletosVersion + 'boletos-cliente'
export const boletosFranchisingUrl = boletosDomain + boletosVersion + 'boletos-franchising'
