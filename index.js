const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// import api modules

const admissionApi = require("./apis/admissionApi/admissionApi");
const usersApi = require("./apis/usersApi/usersApi");
const queriesApi = require("./apis/queriesApi/queryApi");

const corsConfig = {
  origin: [
    "http://localhost:5173",
    "https://sunwingstrainingcentre.netlify.app",
    "*",
  ],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// middlewares
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.whmcjvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //  collection starts here-----
    const admissionCollection = client
      .db("training-admission")
      .collection("admission");
    const usersCollection = client.db("training-admission").collection("users");
    const queriesCollection = client
      .db("training-admission")
      .collection("queries");
    // collection ends here--------

    // api start here-------
    app.use("/admission", admissionApi(admissionCollection));
    app.use("/users", usersApi(usersCollection));
    app.use("/query", queriesApi(queriesCollection));
    // api ends here--------

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!!!✅");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// basic setup
app.get("/", (req, res) => {
  res.send("Training Admission Server is Running.");
});

app.listen(port, () => {
  console.log(`Training Admission Server is Running on PORT:🆗 ${port}`);
});
