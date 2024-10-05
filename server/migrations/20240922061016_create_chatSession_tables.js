exports.up = function (knex) {
  return (
    knex.schema
      .createTable('chatSessions', (table) => {
        table.increments('id').primary();
        table.string('sessionID').notNullable().unique();
        table.string('sessionName').notNullable();
        table.string('participants', 2000);
        table.integer("userID");
        table.foreign("userID").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
      })
      .createTable("chatSessionHist",(table) => {
      table.increments("id").primary();
      table.string("sessionID").notNullable();
      table.string("senderID").notNullable();
      table.string("receiverID").notNullable();
      table.text("message").notNullable();
      table.biginteger("timestamp").notNullable();
      table.string("messageID").notNullable().unique();
      table.string("ttsAudioFile");
      table.foreign("sessionID").references("sessionID").inTable("chatSessions").onUpdate("CASCADE").onDelete("CASCADE");
    })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTable("chatSessions").dropTable("chatSessionHist");
};
