var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.get('/',function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/page1',function(request, response){
  response.sendFile(__dirname + '/page1.html');
});

app.get('/page2',function(request, response){
  response.sendFile(__dirname + '/page2.html');
});

app.get('/page3',function(request, response){
  response.sendFile(__dirname + '/page3.html');
});

app.listen(3000, function(){
  console.log('Server Express Ready!');
});
