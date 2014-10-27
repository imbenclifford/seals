var Hapi = require("hapi");

var dbOpts = {
    "url": "mongodb://BC:BCRox@linus.mongohq.com:10029/coderunnertests",
    "settings": {
        "db": {
            "native_parser": false
        }
    }
};

var server = new Hapi.Server(8080)

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {  
        directory: {
            path:'public',
            listing: true
        }
    }
});


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
    path: '/formy',
    handler: function(req, res){
        res.file('./formy.html')
    }
})

server.route( {
    "method"  : "GET",
    "path"    : "/mong",
    "handler" : usersHandler
});

function usersHandler(request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('scubadog').find().toArray(function(err, result) {
        if (err) return reply(Hapi.error.internal('Internal MongoDB error', err));
        reply.view('name', {'message': result});
    });
};

server.route({
    "method" :  'POST',
    "path"   :  '/post',
    "handler":  postHandler
});

function postHandler(request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;

    var newEntry = {
        user: request.payload.user,
        title: request.payload.title,
        message: request.payload.message
        };

    db.collection('scubadog').insert(newEntry, function(err, data){
        if (err) console.log('haloha!');
    }
    );
    
    reply("You did it man! You submitted a post!")
};

server.route({
  method: 'GET',
 path: '/quote/{id?}',
 handler: indiHandler
});



function indiHandler(req, reply){
    var db = req.server.plugins['hapi-mongodb'].db;
    db.collection('scubadog').find().toArray(function(err, quotes) {
        if (err) return reply(Hapi.error.internal('Internal MongoDB error', err));  
            if (req.params.id) {
              if (quotes.length <= req.params.id) {
                return reply('No quote found.').code(404);
              }
              return reply(quotes[req.params.id]);
            }
            reply(quotes);
    })
};

server.start(function() {
    console.log("Server started at " + server.info.uri);
});