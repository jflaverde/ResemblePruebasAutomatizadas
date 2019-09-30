var http = require('http');
var fs = require('fs');
var path = require('path');


var server = http.createServer(function(req,res){
  console.log('request was made: ' + req.url);
  res.writeHeader(200, {"Content-Type": "text/html"});
  var filename = path.join(__dirname, 'index.html');

  var myReadStream = fs.createReadStream(filename,'utf8');
  myReadStream.pipe(res);
});

server.listen(8030,'127.0.0.1');
console.log('escuchando puerto 8030') 