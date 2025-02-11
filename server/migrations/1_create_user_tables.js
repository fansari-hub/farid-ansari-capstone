exports.up = function (knex) {
    return (
      knex.schema
        .createTable('users', (table) => {
          table.increments('id').primary().notNullable().unique();
          table.string('email').notNullable().unique();
          table.string('authID').notNullable().unique();
          table.string('status', 1).notNullable();
        })
    );
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };
  