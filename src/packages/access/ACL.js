import _ from 'lodash'
export default function install(Vue, { store }) {
  let roles = {}
  var ACL = {
    // Irá verificar as permissões do usuário, pode receber um array ou um unico objeto
    can(permission, requireAll = false) {
      let self = this
      let levels = store.state.Auth.roles
      if (_.isArray(permission)) {
        for (let i = 0; i < permission.length; i++) {
          let hasPerm = self.can(permission[i].name)
          if (hasPerm && !requireAll) {
            return true
          } else if (!hasPerm && requireAll) {
            return false
          }
        }
        return requireAll
      } else {
        for (let i = 0; i < levels.length; i++) {
          for (var j = 0; j < levels[i].perms.length; j++) {
            if (levels[i].perms[j].name.toUpperCase() === permission.toUpperCase()) {
              return true
            }
          }
        }
      }
      return false
    },
    // Irá verificar se o usuário possui o nível de Acesso
    hasRole(name, requireAll = false) {
      if (_.isArray(name)) {
        for (let i = 0; i < name.length; i++) {
          let hasRole = this.hasRole(name[i])
          if (hasRole && !requireAll) {
              return true;
          } else if (!hasRole && requireAll) {
              return false;
          }
        }
          // If we've made it this far and $requireAll is FALSE, then NONE of the roles were found
          // If we've made it this far and $requireAll is TRUE, then ALL of the roles were found.
          // Return the value of $requireAll;
          return requireAll;
        } else {
          for (let i = 0; i < store.state.Auth.user.roles.length; i++) {
            if (store.state.Auth.user.roles[i].name.toUpperCase() === name.toUpperCase()) {
              return true
            }
          }
        }
        return false;
    },
    setRoles(r) {
      roles = r
    }
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  Object.defineProperty(Vue.prototype, '$acl', {
    get() {
      return ACL
    },
  })
}
