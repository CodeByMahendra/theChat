import mongoose from "mongoose";

const connectDB = async () => {
   try {
    await mongoose.connect('mongodb://localhost:27017/TheChattingApp')
    console.log("Database connected")
   } catch (error) {
     console.log('Not connected  database')
   }
};
export default connectDB;