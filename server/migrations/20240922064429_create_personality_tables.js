exports.up = function (knex) {
    return (
      knex.schema
        .createTable('personalities', (table) => {
          table.string('personalityID').primary();
          table.string('name').notNullable();
          table.string('avatarImg').notNullable();
          table.float('temperature').notNullable();
          table.string('conditionPrompt').notNullable();
        })
    );
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("personalities");
  };
  