exports.up = function(knex, Promise) {
  return knex.schema.createTable("category", (table)=>{
    table.increments();
    table.string("category", 255).notNullable();
    table.integer('users_id').index().references('users.id').notNullable().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("category");
};
