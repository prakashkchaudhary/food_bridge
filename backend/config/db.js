const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
};

module.exports = connectDB;
