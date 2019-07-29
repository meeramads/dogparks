const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const session = require('express-session')
const app = express();

//require db
require('./db/db')

//require controllers
const usersController = require('./controllers/users.js')
const parksController = require('./controllers/parks.js')


//middleware 
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'))

//use controllers 
app.use('/parks', parksController);
app.use('/users', usersController);

//route for home page
app.get('/', (req,res) => {
    res.render('index.ejs')
})


app.listen(3000, () => {
    console.log('dog app server up')
})