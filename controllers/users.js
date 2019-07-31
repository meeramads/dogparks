const express = require('express');
const router = express.Router();
//Users controller model
const User = require('../models/users');
//Parks controller model
const Park = require('../models/parks')
//bcrypt
const bcrypt = require('bcryptjs');


//user home route
router.get('/', (req,res) => {
    User.find({}, (err,foundUsers)=>{
        res.render('users/index.ejs',{
            users: foundUsers
        })
    })
    
})

// /:id === /new

//user new page 
router.get('/new', (req,res)=>{   
    res.render('users/new.ejs')
})



//parks on new page
router.get('/:id', (req, res)=>{
    Park.find({}, (err, allParks)=>{
        User.findById(req.params.id, (err, user) => {
            // console.log(allParks)
            res.render('users/show.ejs', {
                parks: allParks,
                user: user
            });
        })
    });
});

//get specific user
router.get("/:id", (req,res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        res.render('users/show.ejs',{
            user: foundUser
        })
    })
})

//edit user route
router.get('/:id/edit',(req,res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        res.render('users/edit.ejs',{
            user: foundUser
        })
    })
})

//put route to display edited user
router.put('/:id', (req,res)=>{
    User.findByIdAndUpdate(req.params.id, req.body,()=>{
        res.redirect(`/users/${req.params.id}`)
    })
})

//delete user route 
router.delete('/:id', (req,res)=>{
    User.findByIdAndRemove(req.params.id, ()=>{
        res.redirect('/')
    })
})

//post route for new user
router.post('/', async (req,res)=>{
    try{
        const password = req.body.password
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const newUser = {
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            city: req.body.city
        }
        User.create(newUser,(err,createdUser)=>{
            if(err){
                res.send(err)
            } else {
                req.session.username = createdUser.username
                req.session.logged = true
                req.session.id = createdUser._id
                res.redirect(`/users/${createdUser.id}`)
            }
        })
    } catch(err){
        res.send(err)
    }
})



module.exports = router;