import mongoose from "mongoose";
export const dbConnect = async () => {
  const MONGO_URL ="mongodb+srv://dillujr10:dilshad4321@cluster0.dbtmqpk.mongodb.net/user-service?retryWrites=true&w=majority&appName=Cluster0"
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`🍃 Database Established connection with MongoDB`);
  } catch (error: any) {
    console.error(`❌ Database Connection failed`);
    console.error(error.message);
    process.exit(1);
  }
};
