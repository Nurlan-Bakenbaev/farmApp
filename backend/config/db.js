import mongoose from "mongoose";

export const connectionDB = async (MONGO_DB_URL) => {
  try {
    await mongoose.connect(MONGO_DB_URL, console.log("DataBase is  MONGO DB"));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
