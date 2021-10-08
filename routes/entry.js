var express = require('express');
var router = express.Router();


// Pull in a reference schema
let EntryCollection = require('../models/EntrySchema');

/* GET landing page. */
router.get('/test', function(req, res, next) {
  res.send('Entry Working');
});

/// CRUD ENDPOINTS

// create
router.post('/', (req,res) => {
  // take the data in the post message
  let bodyData = req.body;
  //Create a new instance of an Entry model
  EntryCollection.create(bodyData, (errors,results) => {
      errors ? res.send(errors) : res.send(results);  
  });
});

// read
// check match /entry/12345
// read one thing/entry
router.get('/:entryId', (req,res) => {
    res.send(`GET request: ID = ${req.params.entryId}`);
});

// update
router.put('/:entryId', (req,res) => {
  res.send(`PUT request: ID = ${req.params.entryId} JSON body - ${req.body}`);
});

// delete
// I need the id for the entry I want to delete
router.delete('/:entryId', (req,res) => {
  EntryCollection.findOneAndDelete({entryTitle: req.params.entryId},(errors,results) => {
    errors ? res.send(errors) : res.send(results);  
});

});


// +1 read all


module.exports = router;