const app = require('./app');
require('./router');
const debug = require('debug')('AccessibilityMap-Backend:server');
const http = require('http');
const config = require('./config/env.config');

/**
* Get port from environment and store in Express.
*/
app.set('port', process.env.PORT || config.server.PORT);
 
/**
* Create HTTP server.
*/
const server = http.createServer(app);

/**
* Listen on provided port, on all network interfaces.
*/
server.listen(app.get('port'));
server.on('error', onError);
server.on('listening', onListening);
 
/**
* Event listener for HTTP server "error" event.
*/
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
* Event listener for HTTP server "listening" event.
*/
function onListening() {
    debug('Listening on ' + app.get('port'));
    console.log("Listening on port " + app.get('port'));
}