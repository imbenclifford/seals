var Hapi = require("hapi");
var handlers = require("./handlers.js")

var dbOpts = {
    "url": "mongodb://BC:BCRox@linus.mongohq.com:10029/coderunnertests",
    "settings": {
        "db": {
            "native_parser": false
        }
    }
};

var server = new Hapi.Server(8080);

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
   "method"  : "GET",
   "path"    : "/index",
   "handler" : handlers.usersHandler
});

server.route( {
   "method"  : "GET",
   "path"    : "/delete",
   "handler" : handlers.deleteHandler
});

server.route( {
   "method"  : "POST",
   "path"    : "/editsub/{id}",
   "handler" : handlers.editHandler
});

server.start(function() {
    console.log("Server started at " + server.info.uri);
});