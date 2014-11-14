//Add all the routes related to Auth Plugin here.
module.exports = [{
    path: "/auth/facebook",
    method: "GET",
    config: {
        auth: 'facebook',
        handler: function(request, reply) {
            var account = request.auth.credentials;
            var sid = account.profile.id;
            console.log(account);
            request.auth.session.set({
                sid: sid
            });
            reply.redirect("/create")
            }
        }
}, /*{
    path: "/auth/google",
    method: "GET",
    config: {
        auth: 'google',
        handler: Handler.sessionManagement
    }
},*/ {
    path: "/logout",
    method: "GET",
    config: {
        handler: function(request, reply) {
            request.auth.session.clear();
            reply.redirect('/');
        }
    }
}];
