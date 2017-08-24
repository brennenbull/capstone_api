const express = require('express');
const router = express.Router();
const knex = require('../knex');
router.get('/?', (req, res, next)=>{
  res.send({
    "message":"In Get",
    "userNotes":"true",
    "notes":{
      "title":"Salty Jeff CEO",
      "content":"So salty, maybe dont work here"
    }
  });
})
router.get('/:id', (req, res, next)=>{
  let id = req.params.id;
  console.log(id);
})
router.post('/:host', (req, res, next)=>{
  let host = req.params.host;
  console.log(host);
  res.send({
    "message":"In post",
    "userNotes":"true",
    "notes":{
      "title":`${req.body.title}`,
      "content":`${req.body.content}`
    }
  });
})
router.patch('/', (req, res, next)=>{
  res.send({
    "message":"In patch"
  });
})
router.delete('/', (req, res, next)=>{
  res.send({
    "message":"In delete"
  });
})

module.exports = router;
