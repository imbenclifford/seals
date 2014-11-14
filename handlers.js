var exports = module.exports = {};
var config = require("./config.js")

//to static files to server returns eg. CSS
exports.loadEntry = {
    directory: {
        path: 'public',
        listing: true
    }
}

//To serve the form page
exports.form = function (req, res){
	res.file('./donateform.html');
	
}

exports.index = function (req, res){
	res.view('./index.html');
	
}

exports.home = function (req, res){
	res.view('./home.swig');
	
}

exports.pay = function (req, res){
	res.view('./pay.swig');
	
}


//To view amount to pay
exports.pay = function(request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
    var collection = db.collection(config.collection);
	
	collection.find({ "sid": request.auth.credentials.sid}).toArray(function (err, result) {
			if (err){console.log("hasn't come through")}
			else{
			reply.view("pay.swig", {
									name: JSON.stringify(request.auth.credentials.name),
									counter: result[0].counter,
			})
			}
	});
}

//To submit donation
exports.post = function(request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
    var collection = db.collection(config.collection);
	
		console.log(request.auth.session)
	
    var newEntry = {
					//needs to come from Facebook
        //user: request.payload.user,
        message: request.payload.message,
        date: new Date(),
				id: Number(request.payload.id),
				counter: request.payload.counter
        };
	
	collection.find({ "sid": request.auth.credentials.sid}).toArray(function (err, result) {
		
		var count;
		
		if (result[0]){
					count = result[0].counter + 1
		}
		else {
			count = 1
		}
		
		var upEntry = {
					//needs to come from Facebook
        user: request.auth.credentials.name,
				sid: request.auth.credentials.sid,
        message: request.payload.message,
        date: new Date(),
				counter: count
        };
	
		collection.update({ user: upEntry.user},
											upEntry,
											{ upsert: true},
											function(err, data){
        if (err) console.log('Problem with updating an entry');
												reply.redirect('/pay')
		});
	})
}
    