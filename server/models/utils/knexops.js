const knex = require("knex")(require("../../knexfile"));

async function updateDatabase(strTable, objData, objCondition) {
    let result
    try {
      result = await knex(strTable).update(objData).where(objCondition);
    } catch (error) {
      console.log("Could not update database!");
      console.log(error);
    }
    return result
  }
  
  async function insertDatabase(strTable, objData) {
    let result;
    try {
      result = await knex(strTable).insert(objData);
    } catch (error) {
      console.log("Could not update database!");
      console.log(error);
    }
    return result;
  }

  async function selectDatabaseAll(strTable, objCondition) {
    let result;
    try {
      if (objCondition){
        result = await knex(strTable).where(objCondition);
      }
      else {
        result = await knex(strTable);
      }
       
    } catch (error) {
      console.log("Could not select from database");
      console.log(error);
    }
    return result;
  }

  async function selectDatabase(objColumns, strTable, objCondition){
    let result;
    try {
      if (objCondition){
        result = await knex.select(objColumns).from(strTable).where(objCondition);
      } else{
        result = await knex.select(objColumns).from(strTable);
      }

    } catch (error) {
      console.log("Could not select from database");
      console.log(error);
    }
    return result;
  }

  module.exports = { updateDatabase, insertDatabase, selectDatabaseAll, selectDatabase};