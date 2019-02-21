// Imports
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const users = require('./data/users');
const todos = require('./data/todos');
const app = express();

// Import funtionality and setup parser for JSON
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(require('cookie-parser')());

// Define handlebars as the view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// URL parser
app.use(require('body-parser').urlencoded({
    extended: true
})); 

// Set up the users session and configure Passport
app.use(require('express-session')({
    secret: 'kitty',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // This session "piggy backs" off the express-session

// A strategy for checking user authenticity
passport.use(new Strategy(
    function (username, password, done) {
        users.getUserByUsername(username).then((user) => {
            bcrypt.compare(password, user.hashedPassword, (err, res) => {
                if (res === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }).catch(function () {
            return done(null, false);
        });
    }));

// Save the user _id to the session
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// Remove the user from the session
passport.deserializeUser(function (id, done) {
    users.getUserById(id).then((user) => {
        if (!user) {
            return done("Error");
        }
        done(null, user);
    });
});

// Help routing ensure a user is logged in
function ensureLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.redirect('/');
    }
}

// Help routing ensure user cannot log in twice be redirecting to todos page
function preventDoubleLogin(req, res, next) {
    if (req.user) {
        res.redirect('pages/todos');
    } else {
        return next();
    }
}

// Show login as initial page
app.get("/", preventDoubleLogin, function (req, res) {
    res.render("pages/login", {
        layout: 'main.handlebars'
    });
});

// If auth fails redirect to login page, if success redirect to todos
app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('pages/login', {
                layout: 'main.handlebars',
                message: "Authentication Failed: Please check username or password."
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/todos');
        });
    })(req, res, next);
});

// An unused function that could gather data in the functionality.js file
app.get("/all", ensureLoggedIn, async function (req, res) {
    const todoArray = await todos.getTodos().toArray();
    const completedArray = await todos.getCompleted().toArray();
    res.JSON({
        todos: todoArray,
        completed: completedArray
    });
});

// If the user is logged in, render todos page with user specific layout
app.get("/todos", ensureLoggedIn, async function (req, res) {
    const todoArray = await todos.getTodos();
    const completedArray = await todos.getCompleted();
    res.render('pages/todos', {
        layout: 'user.handlebars',
        user: req.user,
        todos: todoArray,
        completed: completedArray
    });
});

// Delete todo with specified id
app.get("/delete/:id", async(req, res) => {
    // try {
    //     await todos.getTodoById(req.params.id);
    // } catch (e) {
    //     res.status(404).json({
    //         error: e
    //     });
    // }
    // try {
        await todos.removeTodo(req.params.id);
    // } catch (e) {
    //     res.status(500).json({
    //         error: e
    //     });
    // }
    res.json({success : "Removed Successfully", status : 200});
});

// Complete todo with specified id
app.get("/complete/:id", async(req, res) => {
    // try {
    //     await todos.getTodoById(req.params.id);
    // } catch (e) {
    //     res.status(404).json({
    //         error: e
    //     });
    // }
    // try {
        let updatedTodo = await todos.getTodoById(req.params.id);
        updatedTodo.completed = true;
        await todos.completeTodo(req.params.id, updatedTodo);
    // } catch (e) {
    //     res.status(500).json({
    //         error: e
    //     });
    // }
    res.json({success : "Updated Successfully", status : 200});
});

// Add todo with specified task, gathered from request body
app.post("/add", async(req, res) => {
    await todos.addTodo(req.body.task);
    // try {
    //     await todos.addTodo("task");
    // } catch (e) {
    //     res.status(500).json({
    //         error: e
    //     });
    // }
    res.json({success : "Added Successfully", status : 200});
});

// Redirect to / when user logs out
app.post("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
});

// Run the server
app.listen(27015, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:27015");
});