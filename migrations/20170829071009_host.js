exports.up = function(knex, Promise) {
  return knex.schema.createTable("host", (table)=>{
    table.increments();
    table.string("hostname", 255).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("host");
};
