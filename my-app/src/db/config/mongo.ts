import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = process.env.MONGO_URI;

// if (!uri) {
//   throw new Error("MONGODB_CONNECTION_STRING is not defined");
// }

let client: MongoClient;

export const getClient = async () => {
  if (!client) {
    client = await MongoClient.connect(uri as string);
    await client.connect();
  }
  return client;
};
