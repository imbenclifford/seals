var handlers = require("./handlers.js");

module.exports = [
{
    method: 'GET',
    path: '/create',
		config: {  // try with redirectTo disabled makes isAuthenticated usefully available
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            plugins: { 'hapi-auth-cookie': { redirectTo: false } }
        },
    handler: handlers.formHandler
},
{
    method: 'POST',
    path:  '/post',
		config: {  // try with redirectTo disabled makes isAuthenticated usefully available
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            plugins: { 'hapi-auth-cookie': { redirectTo: false } }
        },
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
