$( document ).ready(function() {
$.ajax({
    url: "http://localhost:4000/db",
    success: function(data) {
      
    var str = '';
        for(var i=0; i<5; i++) {
           str += '<li>'
               + data[i].user
               + '<li>'
               + data[i].title
        }
    $( "#comments" ).append(str);
    }
    });
  });