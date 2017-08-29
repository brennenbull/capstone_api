const express = require('express');
const router = express.Router();
const knex = require('../knex');
router.get('/?', (req, res, next)=>{
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

})
router.post('/:host', (req, res, next)=>{
  let host = req.params.host;
  let users_id = 1;
  let postObj = {
    "title":req.body.title,
    "content":req.body.content,
    "users_id":users_id
  }
  knex('notes')
    .insert(postObj, "*")
    .then((newNote)=>{
      let newNoteId = newNote[0].id;
      console.log(newNote);
      knex('host')
        .select("*")
        .where('hostname', host)
        .then((hostObj)=>{
          if(hostObj.length === 0){
            knex('host')
              .insert({hostname:host}, "*")
              .then((newhost)=>{
                let hostId = newhost[0].id;
                  knex('notes_host')
                    .insert({'host_id':hostId,'notes_id':newNoteId},'*')
                    .then((hostClue)=>{
                      knex('notes_host')
                      .select('*')
                      .where('host_id', hostClue[0].host_id)
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
                  })
              })
          }else{
            let hostId = hostObj[0].id;
              knex('notes_host')
                .insert({'host_id':hostId,'notes_id':newNoteId},'*')
                .then((hostClue)=>{
                  knex('notes_host')
                  .select('*')
                  .where('host_id', hostClue[0].host_id)
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
              })
          }
        })
    })

  // res.send({
  //   "message":"In post",
  //   "userNotes":"true",
  //   "notes":{
  //     "title":`${req.body.title}`,
  //     "content":`${req.body.content}`
  //   }
  // });
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
