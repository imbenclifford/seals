var Hapi = require("hapi");
var handlers = require("./handlers.js");
var Config = require("./config.js");
var Good = require('good');


// turn debugging on
var serverOpts = {
    debug: {
  request: ['error']
    },
  cors: true  
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

var server = new Hapi.Server(~~process.env.PORT || 3000, serverOpts);


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

server.views({
    engines: { jade: require('jade') },
    path: './jade'
});

server.pack.register([
  {
    plugin: require('good'),
    options: options
  },
  {
    plugin: require( 'hapi-mongodb'),
    options: dbOpts
  },
  { plugin: require('bell') },
    { plugin: require('hapi-auth-cookie') },
    { plugin: require('./plugins/auth')}],
 function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
  server.route([{
        path: '/myprofile',
        method: 'GET',
        config: {
            auth: 'session',
            handler: function(request, reply) {
                reply('<html><head><title>Login page</title></head><body><h3>Welcome '
                  + JSON.stringify(request.auth.credentials, null, 4)
                  + '!</h3><br/><form method="get" action="/logout">'
                  + '<input type="submit" value="Logout">'
                  + '</form></body></html>');
            }
        }
    }, {
        path: '/',
        method: 'GET',
        config: {  // try with redirectTo disabled makes isAuthenticated usefully available
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            plugins: { 'hapi-auth-cookie': { redirectTo: false } }
        },
        handler: function(request, reply) {
            reply.view('testo', {
                auth: JSON.stringify(request.auth),
                session: JSON.stringify(request.session),
                isLoggedIn: request.auth.isAuthenticated,
            });
        }
    },{
        path: '/{path*}',
        method: 'GET',
        handler: {
            directory: {
                path: './public',
                listing: false,
                index: true
            }
        }
    }]);
    server.start(function(err) {
        if (err) {
            console.log('error message ' + err);
        }
        console.log('Hapi server started @ ' + server.info.uri);
        console.log('server started on port: ', server.info.port);
    });
});

server.route({
    method: 'GET',
    path: '/create',
    handler: handlers.formHandler
});

server.route({
    method: 'GET',
    path: '/comment',
    handler: handlers.comment
});

server.route({
    method: 'GET',
    path: '/testcomments',
    handler: handlers.testcomments
});

/*server.route({
    method: 'GET',
    path: '/edit/{id}',
    handler: handlers.editformHandler
});*/

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

/*server.route( {
   method  : "GET",
   path   : "/delete",
   handler : handlers.deleteHandler
});

server.route( {
   "method"  : "POST",
   "path"    : "/editsub/{id}",
   "handler" : handlers.editHandler
});*/

/*server.route( {
  method : "GET",
  path :  "/{param*}",
  handler :  {
    directory: {
      path: "./public",
      listing: false,
      index: false
    }
  }
});*/

/*server.route({
  method : "GET",
  path : "/test",
  handler : handlers.testHandler
});*/


if (!module.parent) {
    server.start(function() {
        console.log("Server started", server.info.uri);
    });
}
module.exports = server;
