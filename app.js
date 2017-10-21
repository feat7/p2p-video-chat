/**
 * Import Required packages
 */
import path from 'path';
import express from 'express';
import easyrtc from 'easyrtc';
import ejs from 'ejs';
import io from 'socket.io';
import nconf from 'nconf';
import fs from 'fs';
import routes from './routes'

/**
 * Settings file: app.config.json
 */
nconf.file('app.config.json');

/**
 * Use Express
 */
let app = express();

/**
 * Static Files Folder Setup
 */
app.use('/public', express.static('public'));

/**
 * Setup Routes
 */
app.use('/', routes);

/**
 * Handle 404 Errors
 */
app.use(
    (req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    } 
);

/**
 * View Engine Setup
 * Using ejs
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * PORT
 * Change from settings file
 */
let port = nconf.get('port');

/**
 * Create a webserver
 */
let server = require('http').createServer(app).listen(port);

/**
 * Socket Server
 */
let socketServer = io.listen(server);

/**
 * ICE SERVERS
 */

easyrtc.setOption('appIceServers', [
    {
        url: 'stun:stun.l.google.com:19302'
    },
    {
        url: 'stun:stun.sipgate.net'
    },
    {
        url: 'stun:217.10.68.152'
    },
    {
        url: 'stun:stun.sipgate.net:10000'
    },
    {
        url: 'stun:217.10.68.152:10000'
    }
]);

easyrtc.listen(app, socketServer);