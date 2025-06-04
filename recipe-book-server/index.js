const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_username}:${process.env.DB_pass}@database25aam.tvtt7ai.mongodb.net/?retryWrites=true&w=majority&appName=Database25aam`;

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
    //await client.connect();

    const RecipeCollection = client.db("recipedb").collection("recipes");
    const UserCollection = client.db("recipedb").collection("users");

    app.get("/recipes", async (req, res) => {
      const cursor = RecipeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/recipes/top", async (req, res) => {
      const query = {};
      const sortFields = { likeCount: -1 };
      const limitNum = 4;
      const cursor = RecipeCollection.find(query)
        .sort(sortFields)
        .limit(limitNum);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/recipes/:_id", async (req, res) => {
      const id = req.params._id;
      const query = { _id: new ObjectId(id) };
      const result = await RecipeCollection.findOne(query);
      res.send(result);
    });

    //creator id

    app.get("/recipes/creator/:creatorId", async (req, res) => {
      const creatorId = req.params.creatorId;
      const query = { creatorId: creatorId };
      const cursor = RecipeCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/recipes", async (req, res) => {
      console.log("data in server", req.body);
      const newRecipe = {
        ...req.body,
        categories: Array.isArray(req.body.categories)
          ? req.body.categories
          : [],
      };
      console.log(newRecipe);
      const result = await RecipeCollection.insertOne(newRecipe);
      res.send(result);
    });

    app.put("/recipes/:_id", async (req, res) => {
      const id = req.params._id;
      const query = { _id: new ObjectId(id) };
      const updatedRecipe = req.body;

      const updateDoc = {
        $set: updatedRecipe,
      };
      const options = { upsert: true };
      const result = await RecipeCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.delete("/recipes/:_id", async (req, res) => {
      const id = req.params._id;
      const query = { _id: new ObjectId(id) };
      const result = await RecipeCollection.deleteOne(query);
      res.send(result);
    });

    //like count

    app.patch("/recipes/:_id/like", async (req, res) => {
      const id = req.params._id;
      const { likeCount } = req.body;

      if (typeof likeCount !== "number") {
        return res.status(400).send({ error: "likeCount must be a number" });
      }

      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { likeCount: likeCount },
      };
      const result = await RecipeCollection.updateOne(query, updateDoc);
      res.send(result);
    });


    ///user data

    app.get("/users", async (req, res) => {
      const cursor = UserCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await UserCollection.findOne(query);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      console.log("data in server", req.body);
      const newUser = req.body;
      console.log(newUser);
      const result = await UserCollection.insertOne(newUser);
      res.send(result);
    });

    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = {email:email};
      const updateduser = req.body;

      const updateDoc = {
        $set: updateduser,
      };
      const options = { upsert: true };
      const result = await UserCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });




    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Recipe book good to go");
});

app.listen(port, () => {
  console.log(`this server running on port ${port}`);
});
