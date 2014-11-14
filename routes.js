var handlers = require("./handlers.js");

module.exports = [
{
    method: 'GET',
    path: '/create',
    handler: handlers.formHandler
},
{
    method: 'POST',
    path:  '/post',
		handler: handlers.postHandler
},
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
