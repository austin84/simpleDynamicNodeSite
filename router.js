const Profile = require('./profile.js');
const renderer = require('./renderer');
const querystring = require('querystring');
const commonHeaders = { 'Content-Type': 'text/html' };

// Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  // if URL == "/" && GET
  if (request.url === '/') {
    if (request.method.toLowerCase() === 'get') {
      //show search field
      response.writeHead(200, commonHeaders);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else {
      //if url == "/" && POST
      //get post data from body
      request.on('data', function (postBody) {
        //extract username
        const query = querystring.parse(postBody.toString());
        //redirect to /:username
        response.writeHead(303, { Location: '/' + query.username });
        response.end();
      });
    }
  }
}

// Handle HTTOP route GET /:username i.e. /austinjveatch
function user(request, response) {
  //if url == "/...."
  const username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view('header', {}, response);

    //get JSON from treehouse
    var studentProfile = new Profile(username);

    //on "end"
    studentProfile.on('end', function (profileJSON) {
      //show profile

      //Store the values which we need
      const values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript,
      };
      //Simple Response
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });

    //on 'error'
    studentProfile.on('error', function (error) {
      //show 'error
      renderer.view('error', { errorMessage: error.message }, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;
