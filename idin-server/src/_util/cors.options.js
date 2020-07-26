const corsOptions = {
	origin: true,
	maxAge: (100 * 60 * 60 * 24), // 24 hours
	methods: 'GET, PUT, POST, DELETE',
	allowedHeaders: [
		'Origin',
		'X-Request-Width',
		'Content-Type',
		'Accept'
	]
};

module.exports = corsOptions;
