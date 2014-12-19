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
    handler: handlers.form
},
{
    method: 'GET',
    path:  '/pay',
		config: {  // try with redirectTo disabled makes isAuthenticated usefully available
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            plugins: { 'hapi-auth-cookie': { redirectTo: false } }
        },
		handler: handlers.pay
},
	{
    method: 'GET',
    path:  '/home',
		config: {  // try with redirectTo disabled makes isAuthenticated usefully available
            auth: {
                strategy: 'session',
                mode: 'required'
            },
            plugins: { 'hapi-auth-cookie': { redirectTo: '/' } }
        },
		handler: handlers.home
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
		handler: handlers.post
},
{
    method: 'POST',
    path:  '/send',
        config: {  // try with redirectTo disabled makes isAuthenticated usefully available
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            plugins: { 'hapi-auth-cookie': { redirectTo: false } }
        },
        handler: handlers.send
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
