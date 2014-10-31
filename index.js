var Hapi = require("hapi");
var Config = require("./config.js");
var Good = require('good');
var Routes = require('./routes.js')


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
  { plugin: require('good'), options: options },
  { plugin: require( 'hapi-mongodb'), options: dbOpts },
  { plugin: require('bell') },
  { plugin: require('hapi-auth-cookie') },
  { plugin: require('./plugins/auth')}],
 function (err) {

    if (err) { console.error(err); throw err;}
  server.route([{
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
            reply.view('login', {
                auth: JSON.stringify(request.auth),
                session: JSON.stringify(request.session),
                isLoggedIn: request.auth.isAuthenticated,
            });
        }

    }]);
  server.route(Routes)
  server.start(function(err) {
        if (err) { console.log('error message ' + err);}

        console.log('Hapi server started @ ' + server.info.uri);
        console.log('server started on port: ', server.info.port);
    });
});
/*if (!module.parent) {
    server.start(function() {
        console.log("Server started", server.info.uri);
    });
}
module.exports = server;*/
