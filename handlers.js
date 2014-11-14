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
exports.formHandler = function (req, res){
	res.file('./donateform.html');
}

//To submit donation
exports.postHandler = function(request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
    var collection = db.collection(config.collection);
    var newEntry = {
					//needs to come from Facebook
        //user: request.payload.user,
        message: request.payload.message,
        date: new Date(),
        };
    collection.insert(newEntry, function(err, data){
        if (err) console.log('Problem with posting a new entry');
            reply("You just made the best possible decision with that donation.");
    });
}
    