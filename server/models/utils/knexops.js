const knex = require("knex")(require("../../knexfile"));

async function updateDatabase(strTable, objData, objCondition) {
    let result
    try {
      result = await knex(strTable).update(objData).where(objCondition);
    } catch (error) {
      console.log("knexops.updateDatabase(): Could not update database!");
      console.log(error);
      return false;
    }
    return result
  }
  

async function deleteDatabase(strTable, objCondition){
  let result;
  try{
    result = await knex(strTable).delete().where(objCondition);
  } catch (error){
    console.log("knexops.deleteDatabase(): Could not delete from database!");
    console.log(error);
    return false
  }
}
  async function insertDatabase(strTable, objData) {
    let result;
    try {
      result = await knex(strTable).insert(objData);
    } catch (error) {
      console.log("knexops.insertDatabase(): Could not insert into database!");
      console.log(error);
      return false;
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
      console.log("knexops.selectDatabaseAll() : could not SELECT ALL from database");
      console.log(error);
      return false;
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
      console.log("knexops.selectDatabase() : Could not select  from database");
      console.log(error);
      return false;
    }
    return result;
  }

  module.exports = { updateDatabase, insertDatabase, selectDatabaseAll, selectDatabase, deleteDatabase};