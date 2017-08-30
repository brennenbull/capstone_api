const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/:id', (req,res,next)=>{
  let id = req.params.id;
  console.log(id);
  knex('users')
    .select('*')
    .where('users.id', id)
    .then((user)=>{
      console.log(user);
    })
});

router.post('/:id', (req,res,next)=>{

});

router.patch('/:id', (req,res,next)=>{

});

router.delete('/:id', (req,res,next)=>{

});

module.exports = router;
