const express = require('express');
const router = express.Router();
const Parks = require('../models/parks');

//park index route
router.get('/', (req,res) => {
    res.render('parks/index.ejs')
})

//new park route
router.get('/new', (req,res) => {
    res.render('parks/new.ejs')
})

//post park route
router.post('/', (req,res) => {
    Parks.create(req.body, (err,createdUser) => {
        res.redirect('/parks')
    })
})

//show park route
router.get('/:id',(req,res) => {
    Parks.findById(req.params.id, (err, foundPark) => {
        res.render('parks/show.ejs', {
            user: foundPark
        })
    })
})


module.exports = router;