const express = require('express')
const router = express.Router();
//auth model 
const Auth = require('../models/auth');
//user model 
const User = require('../models/users')
//bcrypt
const bcrypt = require('bcryptjs')

router.post('/login', async (req,res)=>{
    try {
        const foundUser = await User.findOne({username: req.body.username})
        if(foundUser) {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                console.log('HITTING HITTING HITTING')
                req.session.username = foundUser.username
                req.session.logged = true
                req.session.id = foundUser._id
                res.redirect(`/users/${foundUser._id}`)
            } else {     
                res.redirect('/')
            }
        } else {
            res.send('WRONG WRONG WRONG WRONG >:)')
        }
    } catch (err) {
        res.send(err)
    }
})


module.exports = router 