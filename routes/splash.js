const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/:id', (req,res,next)=>{
  console.log('in heroku get');
  let id = req.params.id;
  let resObj = {
    hostsNotes:{

    }
  }
  knex('users')
    .select('*')
    .where('users.id', id)
    .then((user)=>{
      let userName = user[0].firstname
      resObj.firstname = userName;
      knex('notes')
        .select('*')
        .where('notes.users_id', id)
        .then((userHost)=>{
          userHost.forEach((ele, i)=>{
            let host = ele.host
            if(resObj.hostsNotes[host] !== undefined){
              resObj.hostsNotes[host].push({notes_id: ele.id,
              host_id: ele.host_id,
              title: ele.title,
              content: ele.content,
              category:ele.category
              })
            }else if(resObj.hostsNotes[host] == undefined){
              resObj.hostsNotes[host]=[{notes_id: ele.id,
              title: ele.title,
              content: ele.content,
              category:ele.category
              }]
            }
          })
          console.log('post: splash get', resObj);
          res.send(resObj)
        })
    })
});

router.post('/:id', (req,res,next)=>{
});

router.patch('/note/:id', (req,res,next)=>{
  let noteID = req.params.id;
  console.log('in note with id '+ noteID);
  console.log(req.body);
  knex('notes')
  .returning('*')
  .update(req.body)
  .where('notes.id', noteID)
  .then(updated=>{
    res.sendStatus(200);
  })
});

router.delete('/note/:id', (req,res,next)=>{
  let noteID = req.params.id;
  knex('notes')
    .returning('*')
    .del()
    .where('id', noteID)
    .then(()=>{
      res.sendStatus(200);
    })


});

module.exports = router;
