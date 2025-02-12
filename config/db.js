import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to DB: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to DB: ${error}`);
        process.exit(1);
    }
}

export default connectDB;