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
        // console.log(foundParks)
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
    // console.log(req.params, "params in the show route")
    Park.findById(req.params.id, (err, foundPark)=>{
        if(err){
            res.send(err);
        } else {
            // console.log(foundPark, "<--- show route, document from mongodb")
            res.render('parks/show.ejs', {
                park: foundPark
            });
        }
    });
});

// edit park route
router.get('/:id/edit', (req,res)=>{
    // console.log(req.params, "params in the edit route")
    Park.findById(req.params.id, (err, foundPark)=>{
        if(err){
            res.send(err);
        } else {
            // console.log(foundPark, "<--- edit route, document from mongodb")
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
            // console.log(response, "<--- Delete route");
            res.redirect('/parks');
        }
    });
});

// put park route
router.put('/:id', (req, res) => {
    Parks.findByIdAndUpdate(req.params.id, req.body, (err, updateResponse) => {
        if(err){
            res.send(err);
        } else {
            // console.log(updateResponse, "<--- put route response from db");
            res.redirect('/parks/' + req.params.id);
        }
    })
})

// post park route
router.post('/', (req, res) => {
    // console.log(req.body, "req.body");
    Parks.create(req.body, (err, createdPark) => {
        if(err){
            res.send(err);
        } else {
            // console.log(createdPark, "<--- createdPark in post route");
            res.redirect('/parks');
        }
    });
});




module.exports = router;