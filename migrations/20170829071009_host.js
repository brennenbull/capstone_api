exports.up = function(knex, Promise) {
  return knex.schema.createTable("host", (table)=>{
    table.increments();
    table.string("hostname", 255).notNullable();
    table.integer('users_id').index().references('users.id').notNullable().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("host");
};
