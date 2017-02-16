var express = require('express');
var layouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');
//var flash = require('connect-flash');

var routes = require('./config/routes');

var app = express();

// Connect to the database
mongoose.connect('mongodb://localhost/wayfarers', function() {
    console.log("Database is now connected");
});

// Add support for cookies
//app.use(cookieParser());

// Add support for sessions
// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'wayfarersuniteundertheyellowsun'
// }));

// Add flash messaging support
// app.use(flash());

// Allow flash messages to be used in every template
// app.use(function(req, res, next){
//     // res.locals will be available in every template
//     res.locals.errors = req.flash('error');
//     console.log(res.locals.errors);
//     next();
// });

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Method Override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Set the view engine to be ejs
app.set('view engine', 'ejs');

// Include express layouts middleware
app.use(layouts);

// Check for user login
// app.use(function(req, res, next) {
//     var urls = ["/sessions/new", "/users/new", "/sessions", "/users"];
//     if(urls.indexOf(req.url) === -1) {
//         if (!req.user) return res.redirect('/sessions/new');
//     }
//     next();
// });

// Add the router
app.use(routes);

// Use public resource folder
app.use(express.static('../public'));

// Start server
app.listen(3000, function() {
    console.log("Server Started. Listening on port 3000");
});

module.exports = app;
