var Lab = require("lab");
var code = require("code");
var Joi = require("joi");
var lab = exports.lab = Lab.script();
var server = require("../index.js");

lab.experiment("Users", function() {

    lab.test("go to test page", function(done) {
        var options = {
            method: "GET",
            url: "/test",
        };
 
        server.inject(options, function(response) {  
            code.expect(response.statusCode).to.equal(200);   
            done();
        });
    });  	

    lab.test("go to index page", function(done) {
        var options = {
            method: "GET",
            url: "/index",
        };
 
        server.inject(options, function(response) {
            code.expect(response.statusCode).to.equal(200);   
            done();
        });
    });     


    /*



    lab.test("creating valid user", function(done) {
        var options = {
            method: "POST",
            url: "/post",
            payload: {
                user: "Godzilla",
                title: "Awesome decoy Test",
                message: "Test driving the test"
            }
        };
 
        server.inject(options, function(response) {
            var result = response.result,
            payload = options.payload;
     
            code.expect(response.statusCode).to.equal(200);   
            code.expect(result.user).to.equal(payload.user);
            code.expect(result.title).to.equal(payload.title);
            code.expect(result.message).to.equal(payload.message);
            code.expect(result.count).to.equal(0);
            done();
        });
    });
*/
});

