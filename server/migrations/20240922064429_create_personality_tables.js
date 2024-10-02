exports.up = function (knex) {
    return (
      knex.schema
        .createTable('personalities', (table) => {
          table.increments('id').primary();
          table.string('personalityID').notNullable().unique();
          table.string('name').notNullable();
          table.string('avatarImg');
          table.float('temperature').notNullable();
          table.string('conditionPrompt', 2000).notNullable();
          table.string('avatarPrompt', 2000);
          table.string('voice').notNullable();
        })
    );
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("personalities");
  };
  