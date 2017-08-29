exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes_host", (table)=>{
    table.increments();
    table.integer("host_id").notNullable();
    table.integer("notes_id").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("notes_host");
};
