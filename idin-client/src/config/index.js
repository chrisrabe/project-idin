const config = {
  server: {
    baseUrl: 'http://idin-server.mybluemix.net',
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
