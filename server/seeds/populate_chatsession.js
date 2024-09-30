/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('chatSessions').del()
  await knex('chatSessions').insert([
    {id: 1, sessionID: "33e08571-1040-454a-b0f1-85715c097748", sessionName: 'Default', participants: '["1c02d7f4-1501-4a4f-93b6-9e856331209a","2e1bae23-25f1-451d-b6ca-eee835f49708","8302063e-3824-4831-a52e-f19941b8c9dc","f82bea02-2698-46a9-8734-3f005557cee3","d7093048-3c32-4777-b341-12d676f8d798"]'},
  ]);
};
