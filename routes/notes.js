const express = require('express');
const router = express.Router();
const knex = require('../knex');
router.get('/?', (req, res, next)=>{
  console.log(req.query)
  let users_id = 1;
  let hostname = req.query.host;
  knex('host')
    .select('id')
    .where('hostname', hostname)
    .then((host)=>{
      if(host.length){
        let hostId = host[0].id
        knex('notes_host')
        .select('*')
        .where('host_id', hostId)
        .join('notes', 'notes_host.notes_id', '=', 'notes.id')
        .then((note)=>{
          let notesArr = [];
          note.forEach((ele, i)=>{
            notesArr.push({
              'title':ele.title,
              'content':ele.content
            });
          })
          res.send({
            "userNotes":"true",
            "notes":notesArr
          })
        })
      }else{
        res.send({'message':'no note in db'});
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
