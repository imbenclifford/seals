var Lab = require("lab");
var code = require("code");
var Joi = require("joi");
var lab = exports.lab = Lab.script();
var server = require("../index.js");

lab.experiment("Users", function() {

	
    lab.test("creating valid user", function(done) {
        var options = {
            method: "PUT",
            url: "/users/testuser",
            payload: {
                full_name: "Test User",
                age: 19,
                image: "dhown783hhdwinx.png"
        }
    };
 
        server.inject(options, function(response) {
            var result = response.result,
            payload = options.payload;
     
            code.expect(response.statusCode).to.equal(200);   
            code.expect(result.full_name).to.equal(payload.full_name);
            code.expect(result.age).to.equal(payload.age);
            code.expect(result.image).to.equal(payload.image);
            code.expect(result.count).to.equal(0);
            done();
        });
    });

});

