export default [
  {
    header: 'Menu',
    navigations: [
      {
        name: 'Dashboard',
        path_name: 'dashboard',
        link: '/home',
        icon: 'icon-home2'
      },
      {
        name: 'Boletos',
        // path_name: 'admin.boletos',
        link: '/boletos',
        icon: 'icon-barcode2',
        children: [
          {
            name: 'Boletos Clientes',
            path_name: 'boletos.clientes',
            link: '/boletos/clientes',
            icon: 'icon-barcode2'
          },
          {
            name: 'Boletos Franchising',
            path_name: 'boletos.franchising',
            link: '/boletos/franchising',
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
