// define um objeto mixin
export const myMixin = {
  methods: {
    formatarData (val) {
      return moment(val).format('DD/MM/YYYY')
    },
    formatarDataEHora (val) {
      return moment(val).format('DD/MM/YYYY HH:mm:ss')
    }
  }
}
