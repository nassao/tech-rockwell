const Server = require('./models/server');

require('dotenv').config();

// REST Api config
const server = new Server();

server.listen();
