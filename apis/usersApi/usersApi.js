const express = require("express");

const usersApi = (usersCollection) => {
  const userRouter = express.Router();

  userRouter.post("/", async (req, res) => {
    const userInfo = req.body;
    userInfo.createdAt = new Date();
    const result = await usersCollection.insertOne(userInfo);
    res.send(result);
  });

  return userRouter;
};

module.exports = usersApi;
