export const Create = r => require.ensure([], () => r(require('../pages/create')), 'user-bundle')
export const Edit = r => require.ensure([], () => r(require('../pages/edit')), 'user-bundle')
export const Home = r => require.ensure([], () => r(require('../pages/index')), 'user-bundle')
export const Profile = r => require.ensure([], () => r(require('../pages/profile')), 'user-bundle')
