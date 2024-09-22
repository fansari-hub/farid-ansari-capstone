exports.up = function (knex) {
  return (
    knex.schema
      .createTable('chatSessions', (table) => {
        table.string('sessionID').primary();
        table.string('sessionName').notNullable();
      })
      .createTable("chatSessionHist",(table) => {
      table.string("sessionID").notNullable();
      table.string("senderID").notNullable();
      table.string("receiverID").notNullable();
      table.string("message").notNullable();
      table.integer("timestamp").notNullable();
      table.foreign("sessionID").references("sessionID").inTable("chatSessions").onUpdate("CASCADE").onDelete("CASCADE");
    })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTable("chatSessions").dropTable("chatSessionHist");
};
