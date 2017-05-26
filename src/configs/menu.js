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
        link: '/boletos',
        icon: 'icon-barcode2',
        children: [
          {
            name: 'Conciliação',
            path_name: 'boletos.conciliation',
            link: '/boletos/conciliation',
            icon: 'icon-barcode2'
          },
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
        {
            name: 'Meu Perfil',
            link: '/security/profile',
            path_name: 'security.profile',
            icon: 'icon-user'
          }
    ]
  },
  {
    header: 'Analytics',
    navigations: [
        {
            name: 'Analytics',
            link: '/analytics',
            icon: 'icon-statistics',
            children: [
              {
                name: 'Analytics Boletos',
                path_name: 'analytics.boletos',
                link: '/analytics/boletos',
                icon: 'icon-barcode2'
              }
            ]
        }
    ]
  }
]
