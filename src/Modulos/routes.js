// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import { routes as auth } from './Access/Auth'
import { routes as boleto } from './Boletos'

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.
// ...dashboard must be the last one because of the catchall instruction

const routeDash = {
  path: '/home',
  component: require('./dashboard'),
  name: 'home',
  meta: { requiresAuth: true, breadcrumb: {name: 'Home', icon: 'icon-home2 position-left'} },
  children: [...boleto]
}
export default [...auth, routeDash]
