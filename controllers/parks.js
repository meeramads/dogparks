const express = require('express');
const router = express.Router();
const Park = require('../models/parks');
//home page for parks 
router.get('/', (req,res)=>{
    Park.find({}, (err,foundParks)=>{
        res.render('parks/index.ejs',{
            parks: foundParks
        })
    })
    
})


//new park route
router.get('/new', (req,res)=>{
    res.render('parks/new.ejs')
})


//post route for new park
router.post('/', (req,res)=>{
    Park.create(req.body,(err,createdPark)=>{
        console.log(createdPark)
        res.redirect('/parks')
    })
})


module.exports = router;