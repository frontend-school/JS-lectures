var express = require('express'),
    posts = require('../data/posts'),
    fs = require('fs'),
    url = require('url'),
    router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { posts: posts });
});

router.get('/posts', function(req, res) {
  res.render('index', { posts: posts });
});

router.get('/post/:postId', function(req, res) {
  var post = posts.filter(function(post) {
    return post.ID == req.params.postId;
  })[0];

  if (post) {
    res.render('post', { post: post });
  }
});

router.post('/post/:postId', function(req, res) {
  var post = posts.filter(function(post) {
    return post.ID == req.params.postId;
  })[0];

  posts[posts.indexOf(post)].comments.push({
    date: new Date().getTime(),
    name: req.body.name,
    text: req.body.text,
    email: req.body.email,
    website: req.body.website
  });

  var postsPath = __dirname + '/../data/posts.json';
  fs.writeFile(postsPath, JSON.stringify(posts), function(err) {
    if (err) { throw err };
    res.render('comments', { post: post });
  });
});

module.exports = router;
