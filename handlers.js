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
				id: Number(request.payload.id),
				counter: request.payload.counter
        };
	
	collection.find({ "user": request.payload.user}).toArray(function (err, result) {
		
		var count;
		
		if (result[0]){
					count = result[0].counter + 1
		}
		else {
			count = 1
		}
		
		var upEntry = {
					//needs to come from Facebook
        user: request.payload.user,
        message: request.payload.message,
        date: new Date(),
				counter: count
        };
	
		collection.update({ user: upEntry.user},
											upEntry,
											{ upsert: true},
											function(err, data){
        if (err) console.log('Problem with updating an entry');
												reply.view("updated")
		});
	})
}																															 
		/*collection.update({ id: editEntry.id }, editEntry, { upsert: true}, function(err,data) {
	        	if(err) console.log(err);
	  
	       		reply.redirect('/articles');
	    	});*/
	
    /*collection.insert(newEntry, function(err, data){
        if (err) console.log('Problem with posting a new entry');
            reply("Well that was seriously cool!");
    });
}*/
    