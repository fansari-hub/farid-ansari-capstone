/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('chatSessions').del()
  await knex('chatSessions').insert([
    {sessionID: "33e08571-1040-454a-b0f1-85715c097748", sessionName: 'Default'},
  ]);
};
