const express = require('express');
const router = express.Router();
const User = require('../models/users');

//user home route
router.get('/', (req,res) => {
    User.find({}, (err,foundUsers)=>{
        res.render('users/show.ejs',{
            users: foundUsers
        })
    })
   
})

//user new page 
router.get('/new', (req,res)=>{
    res.render('users/new.ejs')
})

//get specific user
router.get("/:id", (req,res)=>{
    User.findById(req.params.id, (err, user)=>{
        res.render('users/show.ejs',{
            user: user
        })
    })
})

//post route for new user
router.post('/', (req,res)=>{
    User.create(req.body,(err,createdUser)=>{
        console.log(createdUser)
        if(err){
            console.log(err)
        }
        res.redirect(`/users/${createdUser._id}`)
    })
})



module.exports = router;