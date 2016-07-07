/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path'), app = express(), session = require('express-session'), MongoStore = require(
        'connect-mongo')(session), settings = require('./settings'), flash = require('connect-flash');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

 app.use(session({
     secret: settings.cookieSecret,
     key: settings.db,//cookie name
     cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
 store: new MongoStore({
 url: 'mongodb://liguanggongzi:asd1215225@ds021000.mlab.com:21000/liguangweb',
 })
 }));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message : err.message,
            error : err.status
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message : err.message,
        error : {}
    });
});

routes(app);
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

// http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});
