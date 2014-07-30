var routeHandlers = require('../controllers/posts_controller'),
    routes = [];

exports.run = function (request, response) {

  get('/', routeHandlers.posts);
  get('/posts', routeHandlers.posts);
  get(/^\/post\/\d+$/, routeHandlers.post);


  function get(url, routeHandler) {
    if (request.method === 'GET') {
      routes.push({url: url, routeHandler: routeHandler});
    }
  }

  function init() {
    routes.forEach(function(route) {
      if (request.url === route.url || typeof route.url === 'object' && route.url.test(request.url)) {
        route.routeHandler(request, response);
      }
    });
    routeHandlers._404(response);
  }

  init();
}
