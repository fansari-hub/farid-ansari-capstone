const knex = require("knex")(require("../knex"));

const dataGet = () => {
    return {msg: "You are trying to GET Data"} ;
} 

const dataPost = () => {
    return {msg: "You are trying to POST Data"} ;
} 

const dataDelete = () => {
    return {msg: "You are trying to DELETE Data"} ;
} 

const dataPatch = () => {
    return {msg: "You are trying to PATCH Data"} ;
} 

module.exports = {
    dataGet,
    dataPost,
    dataDelete,
    dataPatch,
  };