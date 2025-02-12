import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
})