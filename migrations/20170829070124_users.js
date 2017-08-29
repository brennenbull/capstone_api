exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", (table)=>{
    table.increments();
    table.string("firstname", 255).notNullable();
    table.string("lastname", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string('hashed_pass', 255).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
