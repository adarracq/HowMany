const RouteManager = function() { };

RouteManager.attach = function(app) {
    app.use('/user', require('./user'));
    app.use('/prob', require('./prob'));
}

module.exports = RouteManager;
