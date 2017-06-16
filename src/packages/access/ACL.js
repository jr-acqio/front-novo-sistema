export default function (Vue) {
  Vue.acl = {
    setAccess (access) {
      localStorage.setItem('niveis', access)
    },
    getAccess() {
      var access = localStorage.getItem('niveis')

      if (!access) {
        return null
      }
      return access
    },
    destroyToken() {
      window.localStorage.removeItem('niveis')
    },
    can() {
      if (!this.getAccess()) {
        return false
      } else {

      }
    }
  }

  Object.defineProperties(Vue.prototype, {
    $acl: {
      get: () => {
        return Vue.acl
      }
    }
  })
}
