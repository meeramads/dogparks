const express = require('express');
const router = express.Router();
const Users = require('../models/users');

//user home route
router.get('/', (req,res) => {
    res.render('users/index.ejs')
})

//register route
router.get('/new', (req,res) => {
    res.render('users/new.ejs')
})

//post register route
router.post('/', (req,res) => {
    User.create(req.body, (err,createdUser) => {
        res.redirect('/users')
    })
})

//show route
router.get('/:id',(req,res) => {
    User.findById(req.params.id, (err, foundUSer) => {
        res.render('users/show.ejs', {
            user: foundUser
        })
    })
})

module.exports = router;