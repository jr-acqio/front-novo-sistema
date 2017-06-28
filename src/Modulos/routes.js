// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import { routes as auth } from './Access/Auth'
import { routes as perms } from './Access/Permissions'
import { routes as roles } from './Access/Roles'
import { routes as boleto } from './Boletos'
import { routes as user } from './Usuario'
import { routes as analytics } from './Analytics'

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.
// ...dashboard must be the last one because of the catchall instruction
export const Dashboard = r => require.ensure([], () => r(require('./dashboard')), 'dash-bundle')
const routeDash = {
  path: '/home',
  component: Dashboard,
  name: 'home',
  meta: { requiresAuth: true, breadcrumb: {name: 'Home', icon: 'icon-home2 position-left'} },
  children: [...boleto, ...perms, ...roles, ...user, ...analytics]
}
export default [...auth, routeDash]
