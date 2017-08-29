exports.seed = function(knex, Promise) {
  return knex('notes_host')
  .del()
    .then(function () {
      return knex('notes_host').insert([
        {
          host_id: 1,
          notes_id: 1
        },
        {
          host_id:1,
          notes_id:2
        },
        {
          host_id:3,
          notes_id:3
        },
        {
          host_id:2,
          notes_id:4
        }
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('notes_host_id_seq', (SELECT MAX(id) FROM notes_host));");
    });
};
