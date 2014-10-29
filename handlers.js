var exports = module.exports = {};



//to static files to server returns eg. CSS
exports.loadEntry = {
    directory: {
        path: 'public',
        listing: true
    }
}




//To serve the form page
exports.formHandler = function (req, res){
	res.file('./formy.html');
}

//To serve edit form page
exports.editformHandler = function (req, res){
  res.file('./editform.html');
}

//To serve the form page
exports.comment = function (req, res){
  res.file('./comment.html');
}

//To serve the form page
exports.testcomments = function (req, res){
  res.file('./testcomments.html');
}

//To create a post
exports.postHandler = function(request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
       var collection = db.collection('runnerbeans');
    collection.find().toArray(function(err, result) {
        var newEntry = {
        user: request.payload.user,
        title: request.payload.title,
        message: request.payload.message,
        id: result.length
        };
    db.collection('runnerbeans').insert(newEntry, function(err, data){
        if (err) console.log('Problem with posting a new entry');
            reply("You did it man! You submitted a post!");
    }
    );

    });    
}

//To see each individual blog
exports.indiHandler = function (req, reply){
   var db = req.server.plugins['hapi-mongodb'].db;
   var collection = db.collection('runnerbeans');
   collection.find({"id": Number(req.params.id)}).toArray(function(err, quotes) {
           reply.view('bpost', {'mess': quotes});
    })
}

//To see all the blog posts
exports.usersHandler = function (request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('runnerbeans').find().toArray(function(err, result) {
	if (err) return reply(Hapi.error.internal('Internal MongoDB error', err));
	reply.view('name', {'message': result});
    });
}

//Footer for index - testing jade extends
exports.usersFooter = function (request, reply) {
  reply.view('indexFooter');
}

//Deletes the first blog post
exports.deleteHandler = function(request, reply){
  var db = request.server.plugins['hapi-mongodb'].db;
  var collection = db.collection('runnerbeans');
  collection.remove({id : 0}, function(err, data){
    if (err) return reply(Hapi.error.internal("Internal MongoDB error", err));
        reply("You just deleted that!")
  })
}    

//Edits the first blog post
exports.editHandler = function(request, reply){
    var db = request.server.plugins['hapi-mongodb'].db;
    var collection = db.collection('runnerbeans');
    collection.update(
      {"id": Number(request.params.id)},
      {
        user: request.payload.user,
        title: request.payload.title,
        message: request.payload.message 
      },
      function(err, submission) {
        if (err) console.log('Problem with editing an entry');
            reply("You did it man! You edited a post!")
      }
    )
}

exports.testHandler = function(request, reply) {
    reply("test");
}
    