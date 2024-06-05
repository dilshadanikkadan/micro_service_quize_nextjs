import mongoose from "mongoose";
export const dbConnect = async () => {
  const MONGO_URL =
    "mongodb+srv://efootball3312:DcisCGdtpXYbplGa@cluster0.bfcfrkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`🍃 Database Established connection with MongoDB`);
  } catch (error: any) {
    console.error(`❌ Database Connection failed`);
    console.error(error.message); 
    process.exit(1);
  }
};
