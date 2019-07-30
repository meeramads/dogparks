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


//park index route
// router.get('/', (req,res) => {
//     res.render('parks/index.ejs')
// })

router.get('/', (req, res) => {
    Park.find({}, (err, foundParks) => {
      if(err){
        res.send(err);
      } else {
        console.log(foundParks)
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
    console.log(req.params, "params in the show route")
    Park.findById(req.params.id, (err, foundPark)=>{
        if(err){
            res.send(err);
        } else {
            console.log(foundPark, "<--- show route, document from mongodb")
            res.render('parks/show.ejs', {
                park: foundPark
            });
        }
    });
});

// edit park route
router.get('/:id/edit', (req,res)=>{
    console.log(req.params, "params in the edit route")
    Park.findById(req.params.id, (err, foundPark)=>{
        if(err){
            res.send(err);
        } else {
            console.log(foundPark, "<--- edit route, document from mongodb")
            res.render('parks/edit.ejs', {
                park: foundPark
            });
        }
    });
});

// put park route
router.delete('/:id', (req, res) =>{
    Park.findOneAndDelete(req.params.id, (err, response) => {
        if(err){
            res.send(err);
        } else {
            console.log(response, "<--- Delete route");
            res.redirect('/parks');
        }
    });
});

router.put('/:id', (req, res) => {
    Park.findByIdAndUpdate(req.params.id, req.body, (err, updateResponse) => {
        if(err){
            res.send(err);
        } else {
            console.log(updateResponse, "<--- put route response from db");
            res.redirect('/parks/' + req.params.id);
        }
    })
})

// post park route
router.post('/', (req, res) => {
    console.log(req.body, "req.body");
    Park.create(req.body, (err, createdPark) => {
        if(err){
            res.send(err);
        } else {
            console.log(createdPark, "<--- createdPark in post route");
            res.redirect('/parks');
        }
    });
});




module.exports = router;