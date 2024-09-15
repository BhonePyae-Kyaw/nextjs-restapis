import mongoose from "mongoose";
require("dotenv").config();

const MONGODB = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Database is already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Database is connecting");
    return;
  }

  try {
    mongoose.connect(MONGODB!, {
      dbName: "next14-mongodb-restapis",
      bufferCommands: true,
    });
    console.log("Database connected.");
  } catch (error: any) {
    console.log("Error", error);
    throw new Error("Database connection failed", error);
  }
};

export default connect;
