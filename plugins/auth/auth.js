var Routes = require("./routes");

exports.register = function(plugin, options, next) {
    
    //Add Multiple strategies here and we have used confidence to pick up the configuration.
    plugin.auth.strategy('facebook', 'bell', {
                provider: 'facebook',
                password: 'hapiauth',
                clientId: '1490858024508044',
                clientSecret: '11ea10f3d659e292a495b525f209578c',
                isSecure: false // Terrible idea but required if not using HTTPS
            });

    //plugin.auth.strategy('google', 'bell', Providers.google);

    plugin.auth.strategy('session', 'cookie', {
        password: 'hapiauth', // give any string you think is right password to encrypted
        cookie: 'sid-hapiauth', // cookie name to use, usually sid-<appname>
        redirectTo: '/',
        isSecure: false,
    });
    //Added a separate file for just routes.
    plugin.route(Routes);
    next();
};

exports.register.attributes = {
    pkg: require("./package.json")
};
