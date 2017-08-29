
exports.seed = function(knex, Promise) {
  return knex('host')
  .del()
    .then(function () {
      return knex('host').insert([
        {
          id:1,
          hostname: 'google'
        },
        {
          id:2,
          hostname: 'voltagead'
        },
        {
          id:3,
          hostname: 'webscale'
        },
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('host_id_seq', (SELECT MAX(id) FROM host));");
    });
};
