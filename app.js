const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const path = require('path');
const session = require('express-session');
require('dotenv').config(); 
const flash = require('connect-flash');
const users = require('./routes/users');
const customers = require('./routes/customers');
const deliveries = require('./routes/deliveries');
const menus = require('./routes/menus');
const restaurants = require('./routes/restaurants');
const orders = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set `secure: true` if using HTTPS
}));

// Set up flash middleware
app.use(flash());

// Set a global variable for flash messages (so they're accessible in all views)
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.error = req.flash('error');  // For passport.js (if used)
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.use(express.urlencoded({ extended: true })); // To parse form data

app.use('/api', routes);

app.use('/', routes);
app.use('/', users);
app.use('/', customers);
app.use('/', deliveries);
app.use('/', menus);
app.use('/', orders);
app.use('/', restaurants);

mongoose.connect('mongodb+srv://Cluster95194:Lavleen@cluster95194.fiw1c.mongodb.net/food_delivery_db', { })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
