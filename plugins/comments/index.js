var handlers = require("./handlers.js");

exports.register = function(plugin, options, next) {
    plugin.route({
        path: "/my/plugin",
        method: "GET",
        handler: function(request, reply) {
            reply("This is where the comments would go");
        }
    });

	/*plugin.route({
	    "method" :  'POST',
	    "path"   :  '/commentpost',
	    "handler":  handlers.commentpost
	});*/

	plugin.route({
	    method: 'GET',
	    path: '/writecomment',
	    handler: handlers.writeComment
	});

    next();
};
 
exports.register.attributes = {
    pkg: require("./package.json")
};
