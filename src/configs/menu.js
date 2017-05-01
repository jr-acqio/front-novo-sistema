export default [
  {
    header: 'Menu',
    navigations: [
      {
        name: 'Dashboard',
        path_name: 'dashboard',
        link: '/admin',
        icon: 'icon-home2'
      },
      {
        name: 'Boletos',
        // path_name: 'admin.boletos',
        // link: '/admin/boletos',
        icon: 'icon-barcode2',
        children: [
          {
            name: 'Boletos Clientes',
            path_name: 'admin.boletos.clientes',
            link: '/admin/boletos/clientes',
            icon: 'icon-barcode2'
          },
          {
            name: 'Boletos Franchising',
            path_name: 'admin.boletos.franchising',
            link: '/admin/boletos/franchising',
            icon: 'icon-barcode2'
          }
        ]
      }
    ]
  },
  {
    header: 'Segurança',
    navigations: [
    ]
  }
]
