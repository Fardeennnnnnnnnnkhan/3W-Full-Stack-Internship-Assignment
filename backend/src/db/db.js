import mongoose from 'mongoose';

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB Successfully");
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
}

export default connectDB;