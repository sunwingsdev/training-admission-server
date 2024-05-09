const express = require("express");
const { ObjectId } = require("mongodb");

const admissionApi = (admissionCollection) => {
  const admissionRouter = express.Router();

  //   add admission list to db
  admissionRouter.post("/", async (req, res) => {
    const admissionInfo = req.body;
    admissionInfo.createdAt = new Date();
    const result = await admissionCollection.insertOne(admissionInfo);
    res.send(result);
  });

  // get all admission
  admissionRouter.get("/", async (req, res) => {
    const result = await admissionCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  });

  // delete a admission
  admissionRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await admissionCollection.deleteOne(query);
    res.send(result);
  });

  return admissionRouter;
};

module.exports = admissionApi;
