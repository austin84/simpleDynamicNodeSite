const router = require('./router');

//Problem: We need a simple way to look at a users badge count and JavaScript points from a web browser

//Solution: Use node.js to preform the profile lookups and serve our templates via http

// Create a web server

const http = require('http');
http
  .createServer(function (request, response) {
    router.home(request, response);
    router.user(request, response);
  })
  .listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1/');

