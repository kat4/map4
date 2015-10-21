
var routes = [];

function addRoute(path, handler) {

    routes.push({
        params: {
            title: path.split(':')[1]
        },
        path: path,
        fn: handler
    });

}

function match(path) {
    var matches = routes.filter(function(route) {
        return route.path === path;
    });

    return matches[0];

}



// router.addRoute('/articles/:title', articleReturn);
// console.log(router.match('/articles/my-router'));

// {
//   params: {
//     title: 'my-router'
//   },
//   route: '/articles/:title',
//   fn: [Function articleReturn]
// }



exports.addRoute = addRoute;
exports.match = match;
exports.routes = routes;
