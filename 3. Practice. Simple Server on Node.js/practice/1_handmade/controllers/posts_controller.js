var posts = require('../data/posts.json'),
    fs = require('fs'),
    ejs = require('ejs');

function send(response, status, body) {
  response.writeHead(status, {
    'Content-Length': body.length,
    'Content-Type': 'text/html'
  });

  response.write(body);
  response.end();
}

exports.posts = function(request, response) {
  var path = __dirname + '/../templates/index.ejs';
  var body = fs.readFileSync(path, 'utf8');

  send(response, 200, ejs.render(body, { posts: posts }));
};

exports.post = function(request, response) {
  var postId = request.url.split('/')[2];
  var post = posts.filter(function(post) {
    return post.ID == postId;
  })[0];

  if (post) {
    var path = __dirname + '/../templates/post.ejs';
    var body = fs.readFileSync(path, 'utf8');

    send(response, 200, ejs.render(body, { post: post }));
  } else {
    exports._404(response);
  }
};

exports._404 = function(response) {
  send(response, 404, 'NOT FOUND');
};
