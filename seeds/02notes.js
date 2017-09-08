exports.seed = function(knex, Promise) {
  return knex('notes')
  .del()
    .then(function () {
      return knex('notes').insert([
        {
          id:1,
          title:"Space X",
          content: "This is a note about SpaceX on google, lets take some notes",
          host:'google',
          category: 'spacex',
          users_id:1
        },
        {
          id:2,
          title:"Should I go to space?",
          content: "This is a note about space, also on google",
          host:'google',
          category: 'spacex',
          users_id:1
        },
        {
          id:3,
          title:"Voltage ad",
          content: "This is a note about Voltage, lets take some notes",
          host:'voltagead',
          category: 'voltage',
          users_id:1
        },
        {
          id:4,
          title:"Note About css grid",
          content: "This is a note about the css grid, lets take some notes",
          host:'css-tricks',
          category: 'cssgrid',
          users_id:1
        }
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('notes_id_seq', (SELECT MAX(id) FROM notes));");
    });
};
