const express = require('express');
const router = express.Router();
const knex = require('../knex');
router.post('/', (req,res,next)=>{
  console.log(req.body);
  let newCategory = req.body.category;
  knex('category')
  .insert({category: newCategory,
    users_id: 1
  }).then(()=>{
    knex('category')
    .select('*')
    .where('users_id', 1)
    .then(cat=>{
      res.send({"userNotes":"true",'categories':cat})
    })
  })
})
module.exports = router;
