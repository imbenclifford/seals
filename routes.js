var handlers = require("./handlers.js");

module.exports = [
{
    method: 'GET',
    path: '/create',
    handler: handlers.formHandler
},
{
    method: 'GET',
    path: '/testcomments',
    handler: handlers.testcomments
},
{
    method: 'POST',
    path:  '/post',
    config: {
            auth: {strategy: 'session',
                  mode: 'required',
                },
            handler: handlers.postHandler
          }
},
{
   method: 'GET',
   path: '/quote/{id}',
   config: {
            auth: {strategy: 'session',
                  mode: 'required',
                },
            handler: function (req, reply){
               var db = req.server.plugins['hapi-mongodb'].db;
               var collection = db.collection('runnerbeans');
               collection.find({"id": Number(req.params.id)}).toArray(function(err, quotes) {
                       reply.view('bpost', {'mess': quotes});
                })
            }
        }
},
{
   method  : "GET",
   path    : "/index",
   handler : handlers.usersHandler
},
/*{
   method  : "GET",
   path   : "/delete",
   handler : handlers.deleteHandler
},*/
/*{
   "method"  : "POST",
   "path"    : "/editsub/{id}",
   "handler" : handlers.editHandler
},*/
{
  method : "GET",
  path :  "/{param*}",
  handler :  {
    directory: {
      path: "./public",
      listing: false,
      index: false
    }
  }
}]
/*{
  method : "GET",
  path : "/test",
  handler : handlers.testHandler
}*/
