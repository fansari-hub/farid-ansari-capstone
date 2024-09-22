/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { v4: uuidv4 } = require("uuid");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('personalities').del()
  await knex('personalities').insert([
    {personalityID: '1c02d7f4-1501-4a4f-93b6-9e856331209a', name: 'Julia', avatarImg : "none", temperature: 0.5, conditionPrompt: "You are an HR Director providing business advice in a board meeting."},
    {personalityID: '2e1bae23-25f1-451d-b6ca-eee835f49708', name: 'George', avatarImg : "none", temperature: 0.5, conditionPrompt: "You are an CEO providing business advice in a board meeting."},
    {personalityID: '8302063e-3824-4831-a52e-f19941b8c9dc', name: 'Frank', avatarImg : "none", temperature: 0.5, conditionPrompt: "You are an IT director business advice in a board meeting."},
  ]);
};