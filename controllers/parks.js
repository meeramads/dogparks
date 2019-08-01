const express = require('express');
const router = express.Router();
//Parks Controller model
const Park = require('../models/parks');
//User controller model
const User = require('../models/users');

//park index route
router.get('/', (req, res) => {
    Park.find({}, (err, foundParks) => {
      if(err){
        res.send(err);
      } else {
        res.render('parks/index.ejs', {
          parks: foundParks
        });
      }
    })
})
 
// new park route
router.get('/new', (req,res) => {
    res.render('parks/new.ejs')
})

// show park route
router.get('/:id', (req,res)=>{
    Park.findById(req.params.id, (err, foundPark)=>{
        if(err){
            res.send(err);
        } else {
            res.render('parks/show.ejs', {
                park: foundPark
            });
        }
    });
});

// edit park route
router.get('/:id/edit', (req,res)=>{
    Park.findById(req.params.id, (err, foundPark)=>{
        if(err){
            res.send(err);
        } else {
            res.render('parks/edit.ejs', {
                park: foundPark
            });
        }
    });
});

// delete park route
router.delete('/:id', (req, res) =>{
    Park.findOneAndDelete(req.params.id, (err, response) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/parks');
        }
    });
});

// put park route
router.put('/:id', (req, res) => {
    Park.findByIdAndUpdate(req.params.id, req.body, (err, updateResponse) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/parks/' + req.params.id);
        }
    })
})

// post park route
router.post('/', (req, res) => {
    Park.create(req.body, (err, createdPark) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/parks');
        }
    });
});




module.exports = router;