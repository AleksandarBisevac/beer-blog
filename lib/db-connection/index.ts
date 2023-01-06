import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(uri as string);
  } catch (error) {
    console.log("db connection failed: ", error);
  }
};

export default dbConnect;
