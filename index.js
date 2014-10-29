var Hapi = require("hapi");
var handlers = require("./handlers.js");
var Config = require("./config.js");
var Good = require('good');


// turn debugging on
var serverOpts = {
    debug: {
	request: ['error']
    }
};

//congig
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


var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: Good.GoodConsole
    }, {
        reporter: Good.GoodFile,
        args: ['./fixtures/awesome', {
            events: {
                ops: '*'
            }
        }]
    }, {
        reporter: require('good-http'),
        args: ['http://localhost:3000', {
            events: {
                error: '*'
            },
            threshold: 20,
            wreck: {
                headers: { 'x-api-key' : 12345 }
            }
        }]
    }]
};

server.pack.register({
    plugin: require('good'),
    options: options
}, function (err) {

   if (err) {
      console.log(err);
      return;
   }
});

server.views({
    engines: { jade: require('jade') },
    path: './jade'
});

server.pack.register([
  {
    plugin: require( 'hapi-mongodb'),
    options: dbOpts
  },
  { plugin: require("./plugins/comments") }],
 function (err) {
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
