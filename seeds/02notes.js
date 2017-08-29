exports.seed = function(knex, Promise) {
  return knex('notes')
  .del()
    .then(function () {
      return knex('notes').insert([
        {
          id:1,
          title:"Note About Google",
          content: "This is a note about google, lets take some notes",
          users_id:1,
        },
        {
          id:2,
          title:"Note About Google",
          content: "This is a note about google, lets take some notes",
          users_id:1,
        },
        {
          id:3,
          title:"Note About webscale",
          content: "This is a note about webscale, lets take some notes",
          users_id:1,
        },
        {
          id:4,
          title:"Note About Voltage Ad",
          content: "This is a note about voltage, lets take some notes",
          users_id:1,
        }
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('notes_id_seq', (SELECT MAX(id) FROM notes));");
    });
};
