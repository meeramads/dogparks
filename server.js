const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session')
const app = express();

//require db
require('./db/db')

//require controllers
const usersController = require('./controllers/users.js')
const parksController = require('./controllers/parks.js')
const authController = require('./controllers/auth.js')

//middleware 
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
    secret: "Listen, do you wana know a secret, NO",
    resave: false,
    saveUninitialized: false
}));

//use controllers 
app.use('/parks', parksController);
app.use('/users', usersController);
app.use('/auth', authController)

//route for home page
app.get('/', (req,res) => {
    res.render('index.ejs')
})


app.listen(3000, () => {
    console.log('dog app server up')
})