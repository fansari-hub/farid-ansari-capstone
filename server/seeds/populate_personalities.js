/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { v4: uuidv4 } = require("uuid");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('personalities').del()
  await knex('personalities').insert([
    {id : 1, personalityID: '1c02d7f4-1501-4a4f-93b6-9e856331209a', name: 'Julia', avatarImg : "none", temperature: 1.0, conditionPrompt: "You are a c++ programmer."},
    {id : 2, personalityID: '2e1bae23-25f1-451d-b6ca-eee835f49708', name: 'George', avatarImg : "none", temperature: 1.0, conditionPrompt: "You are a python programmer."},
    {id : 3, personalityID: '8302063e-3824-4831-a52e-f19941b8c9dc', name: 'Frank', avatarImg : "none", temperature: 1.0, conditionPrompt: "You are a javascript programmer."},
  ]);
};