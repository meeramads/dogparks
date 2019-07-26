const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const session = require('express-session')
const app = express();

//require db
require('./db/db')

//middleware 
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'))
//require controllers
const usersController = require('./controllers/users')
const parksController = require('./controllers/parks')


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