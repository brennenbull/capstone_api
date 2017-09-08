
exports.seed = function(knex, Promise) {
  return knex('category')
  .del()
    .then(function () {
      return knex('category').insert([
        {
          id: 1,
          category: 'spacex',
          users_id: 1
        },
        {
          id:2,
          category: 'voltage',
          users_id: 1
        },
        {
          id:3,
          category: 'cssgrid',
          users_id: 1
        },
        {
          id:4,
          category: 'angular',
          users_id: 1
        }
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('category_id_seq', (SELECT MAX(id) FROM category));");
    });
};
