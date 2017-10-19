/**
 * app.js
 */
import express from 'express'
import easyrtc from 'easyrtc'
import ejs from 'ejs'
import io from 'socket.io'
import nconf from 'nconf'
import fs from 'fs'

nconf.file('app.config.json');

let app = express();


var port = nconf.get('port');

let server = require('http').createServer(app).listen(port);
