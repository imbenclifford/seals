var Hapi = require("hapi");
var handlers = require("./handlers.js");
var Config = require("./config.js");

// turn debugging on
var serverOpts = {
    debug: {
	request: ['error']
    }
};

var dbOpts = {
    url: Config.db,
    settings: {
        db: {
            native_parser: false
        }
    }
};

// include the serverOpts
var server = new Hapi.Server(8080, serverOpts);

server.views({
    engines: { jade: require('jade') },
    path: './jade'
});

server.pack.register({
    plugin: require( 'hapi-mongodb'),
    options: dbOpts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

server.route({
    method: 'GET',
    path: '/create',
    handler: handlers.formHandler
});

server.route({
    method: 'GET',
    path: '/edit/{id}',
    handler: handlers.editformHandler
});


//something is not right...
server.route({
    "method" :  'POST',
    "path"   :  '/post',
    "handler":  handlers.postHandler
});

server.route({
 method: 'GET',
 path: '/quote/{id}',
 handler: handlers.indiHandler
});

server.route( {
   method  : "GET",
   path    : "/index",
   handler : handlers.usersHandler
});

server.route( {
   method  : "GET",
   path   : "/delete",
   handler : handlers.deleteHandler
});

server.route( {
   "method"  : "POST",
   "path"    : "/editsub/{id}",
   "handler" : handlers.editHandler
});

server.route( {
  method : "GET",
  path :  "/{param*}",
  handler :   handlers.loadEntry
});

server.route({
  method : "GET",
  path : "/test",
  handler : handlers.testHandler
});


if (!module.parent) {
    server.start(function() {
        console.log("Server started", server.info.uri);
    });
}
module.exports = server;