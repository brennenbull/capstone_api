exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", (table)=>{
    table.increments();
    table.string("title", 255).notNullable();
    table.string("content", 255).notNullable();
    table.integer("users_id").index().references('users.id').notNullable().onDelete('cascade');
    table.string('host', 255).notNullable();
    table.string('category',255).notNullable().defaultTo('none')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("notes");
};
