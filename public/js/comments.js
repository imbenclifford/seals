$( document ).ready(function() {
$.ajax({
    url: "http://localhost:4000/db",
    success: function(data) {
      
    var str = '';
        for(var i=0; i<5; i++) {
           str += '<li>'
               + data[0].user
               + '<li>'
               + data[0].title
        }
        console.log(data[0].user)
    $( "#comments" ).append(str);
    }
    });
  });