var express = require('express');
var layouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./config/routes');
var User = require('./models/user');

var app = express();

// Use public resource folder
app.use(express.static('public'));

// Connect to the database
mongoose.connect('mongodb://localhost/wayfarers', function() {
    console.log("Database is now connected");
});

// Add support for cookies
app.use(cookieParser());

// Add support for sessions
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'wayfarersuniteundertheyellowsun'
}));

// Load logged in user
app.use(function(req, res, next) {
    // No user id? just move on
    if (!req.session.user) {
        res.locals.user = false;
        next();
    } else {
        // Load the user with the ID in the session
        User.findById(req.session.user, function(err, user) {
            if (user) {
                // Add the user to the request object
                req.user = user;
                // Add it to locals so we can use it in all templates
                res.locals.user = user;
            } else {
                // Couldn't find it... that's weird. clear the session
                req.session.user = null;
            }

            next(err);
        });
    }
});

// Add flash messaging support
app.use(flash());

// Allow flash messages to be used in every template
app.use(function(req, res, next) {
    // res.locals will be available in every template
    res.locals.errors = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));

// Method Override
app.use(methodOverride(function(req, res) {
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
app.use(function(req, res, next) {
    var urls = ["/sessions", "/sessions/new", "/users", "/users/new", "/"];
    if ((/\/api/g).test(req.url)) return next();
    if(urls.indexOf(req.url) === -1) {
        if (!req.user) return res.redirect('/sessions/new');
    }
    next();
});

// Add the router
app.use(routes);

// Start server
app.listen(3000, function() {
    console.log("Server Started. Listening on port 3000");
});

module.exports = app;
