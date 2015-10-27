
/**
 * Module dependencies 
 */

var express = require('express'),
    path = require('path'),
    http = require('http');

var env = process.env.NODE_ENV || 'development';
var app = module.exports = express();

// express config
app.set('port', process.env.PORT || 4000);
app.use(express.static(path.join(__dirname, 'app')));

// Start Server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
