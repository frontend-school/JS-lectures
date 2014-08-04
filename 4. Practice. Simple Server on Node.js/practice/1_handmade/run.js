var router = require('./router'),
    http = require('http');

http.createServer(function(request, response) {
  router.run(request, response);
}).listen('3000');
