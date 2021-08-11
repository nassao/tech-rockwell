const express = require('express');
require('dotenv').config();

/**
 * REST Server for application
 */
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.cronApiPath = '/api/cron';

        this.middlewares();
        this.routes();
    }    
    
    /**
     * Middlewares configurations
     */
    middlewares() {
        // Read and parse body
        this.app.use( express.json() );

        // Static content (Angular App)
        this.app.use(express.static('public'));
    }

    /**
     * REST Server routes
     */
    routes() {
        // API for cron
        this.app.use(this.cronApiPath, require('../routes/cron'));

        // Routes to listen
        this.app.get('/test', (req, res) => {
            console.log('get test');
            res.status(201).json({
                msg: 'Test response created'
            });
        });    
        
        // Default calls
        this.app.get('*', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });    
    }    
    
    /**
     * Server start
     */
    listen() {
        // Server initialization
        this.app.listen(this.port, () => {
            console.log(`Listening at http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;