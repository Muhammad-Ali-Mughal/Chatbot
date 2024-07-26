import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("Can't connect to Database.");
  }
}

async function diconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Can't disconnect to Database.");
  }
}

export { connectToDatabase, diconnectFromDatabase };
