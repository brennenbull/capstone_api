const express = require('express');
const router = express.Router();
const knex = require('../knex');
router.get('/?', (req, res, next)=>{
  console.log('in get');
  let users_id = 1;
  let hostname = req.query.host;
  knex('host')
    .select('id')
    .where('hostname', hostname)
    .then((host)=>{
      if(host.length){
        let hostId = host[0].id
        knex('notes')
        .select('*')
        .where('host', hostname)
        .then((note)=>{
          let notesArr = [];
          note.forEach((ele, i)=>{
            notesArr.push({
              'title':ele.title,
              'content':ele.content,
              'category':ele.category
            });
          })
          knex('category')
          .select('*')
          .where('users_id',1)
          .then((cat)=>{
            res.send({
              "userNotes":"true",
              "notes":notesArr,
              "categories":cat
            })
          })
        })
      }else{
        knex('category')
        .select('*')
        .where('users_id',1)
        .then((cat)=>{
          res.send({"userNotes":"true",'categories':cat});
        })
      }
    });
})
router.get('/:id', (req, res, next)=>{
  let id = req.params.id;

})
router.post('/:host', (req, res, next)=>{
  let host = req.params.host;
  let cat = req.body.category;
  let usersID = 1;
  let postObj = {
    "title":req.body.title,
    "content":req.body.content,
    "users_id":usersID,
    "host":host,
    "category":cat,
  }
  console.log('posting new note');
  knex('notes')
    .insert(postObj, "*")
    .then((newNote)=>{
      knex('host')
        .select("*")
        .where('hostname', host)
        .then((hostObj)=>{
          if(hostObj.length === 0){
            knex('host')
              .insert({
                hostname:host,
                users_id:usersID
              }, "*")
              .then((newhost)=>{
                knex('notes')
                .select('*')
                .where('host', host)
                .then((note)=>{
                  let notesArr = [];
                  note.forEach((ele, i)=>{
                    notesArr.push({
                      'title':ele.title,
                      'content':ele.content,
                      'category':ele.category
                    });
                  })
                  res.send({
                    "userNotes":"true",
                    "notes":notesArr
                  })
                })
              })
          }else{
            knex('notes')
            .select('*')
            .where('host', host)
            .then((note)=>{
              let notesArr = [];
              note.forEach((ele, i)=>{
                notesArr.push({
                  'title':ele.title,
                  'content':ele.content,
                  'category':ele.category
                });
              })
              res.send({
                "userNotes":"true",
                "notes":notesArr
              })
            })
          }
        })
    })

})


router.delete('/', (req, res, next)=>{
  res.send({
    "message":"In delete"
  });
})

module.exports = router;
