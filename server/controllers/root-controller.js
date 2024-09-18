const rootModel = require("../models/root-model");


const getFun = async (_req, res) => {
    try {
      const data = rootModel.dataGet();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(`Error with GET!: ${err}`);
    }
  };

  const postFun = async (_req, res) => {
    try {
      const data = rootModel.dataPost();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(`Error with GET!: ${err}`);
    }
  };

  const patchFun = async (_req, res) => {
    try {
      const data = rootModel.dataPatch();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(`Error with GET!: ${err}`);
    }
  };

  const delFun = async (_req, res) => {
    try {
      const data = rootModel.dataDelete();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(`Error with GET!: ${err}`);
    }
  };


  module.exports = {
    getFun,
    postFun,
    patchFun,
    delFun,
  };