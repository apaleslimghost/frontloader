const http2 = require('http2');
const createCert = require('create-cert');

createCert().then(pem => {
	const server = http2.createSecureServer(pem, (req, res) => {
		const { socket: { alpnProtocol } } = req.httpVersion === '2.0' ? req.stream.session : req;
		res.writeHead(200, { 'content-type': 'application/json' });
		res.end(JSON.stringify({
			alpnProtocol,
			httpVersion: req.httpVersion
		}));
	});

	server.listen(8443, () => console.log('https://localhost:8443'));
});
