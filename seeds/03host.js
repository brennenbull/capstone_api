
exports.seed = function(knex, Promise) {
  return knex('host')
  .del()
    .then(function () {
      return knex('host').insert([
        {
          id:1,
          hostname: 'google',
          users_id: 1
        },
        {
          id:2,
          hostname: 'voltagead',
          users_id: 1
        },
        {
          id:3,
          hostname: 'css-tricks',
          users_id: 1
        },
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('host_id_seq', (SELECT MAX(id) FROM host));");
    });
};
