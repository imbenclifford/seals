$( document ).ready(function() {
$.ajax({
    url: "https://nameless-spire-9975.herokuapp.com/db",
    success: function(data) {
      
    var str = '';

    for(var i=0; i<data.length; i++) {
       str +='<li><b>'
           + data[i].user
           + '</b><li>'
           + data[i].title
    }
    $( "#comments" ).append(str);
    }
    });
  });