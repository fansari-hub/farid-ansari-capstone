exports.up = function (knex) {
    return (
      knex.schema
        .createTable('personalities', (table) => {
          table.increments('id').primary().notNullable().unique();
          table.string('personalityID').notNullable().unique();
          table.string('name').notNullable();
          table.string('avatarImg');
          table.float('temperature').notNullable();
          table.string('conditionPrompt', 2000).notNullable();
          table.string('avatarPrompt', 2000);
          table.string('voice').notNullable();
          table.integer('userID').notNullable().unsigned();
          table.foreign('userID').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        })
    );
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("personalities");
  };
  