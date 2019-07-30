const express = require('express');
const router = express.Router();
//Users controller model
const User = require('../models/users');
//Parks controller model
const Park = require('../models/parks')

//user home route
// router.get('/', (req,res) => {
//     User.find({}, (err,foundUsers)=>{
//         res.render('users/index.ejs',{
//             users: foundUsers
//         })
//     })
   
// })

//user new page 
router.get('/new', (req,res)=>{   
    res.render('users/new.ejs')
})



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
router.post('/', (req,res)=>{
    User.create(req.body,(err,createdUser)=>{
        console.log(createdUser)
        if(err){
            console.log(err)
        }
        res.redirect(`/users/${createdUser.id}`)
    })
})



module.exports = router;