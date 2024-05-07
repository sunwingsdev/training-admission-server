const express = require("express");

const admissionApi = (admissionCollection) => {
  const admissionRouter = express.Router();

  //   add admission list to db
  admissionRouter.post("/", async (req, res) => {
    const admissionInfo = req.body;
    const result = await admissionCollection.insertOne(admissionInfo);
    res.send(result);
  });

  return admissionRouter;
};

module.exports = admissionApi;
