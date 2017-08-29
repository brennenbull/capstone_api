
exports.seed = function(knex, Promise) {
  return knex('users')
  .del()
    .then(function () {
      return knex('users').insert([{
        id:1,
        firstname:"Brennen",
        lastname: "Bull",
        email: "brennenbull@hotmail.com",
        hashed_pass: 'test',
      }]);
    }).then(function(){
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
