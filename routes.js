var handlers = require("./handlers.js");

module.exports = [
{
    method: 'GET',
    path: '/create',
    handler: handlers.formHandler
},
{
    method: 'GET',
    path: '/comment',
    handler: handlers.comment
},
{
    method: 'GET',
    path: '/testcomments',
    handler: handlers.testcomments
},
{
    "method" :  'POST',
    "path"   :  '/post',
    "handler":  handlers.postHandler
},
{
   method: 'GET',
   path: '/quote/{id}',
   handler: handlers.indiHandler
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
