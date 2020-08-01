const config = {
  server: {
    baseUrl: 'http://localhost:8080',
    api: {
      v1: '/api/v1',
    },
    route: {
      organisation: '/organisation',
      user: '/user',
      items: '/items',
      inventory: '/inventory',
      transaction: '/transaction',
      requests: '/requests',
    },
  },
};

export default config;
