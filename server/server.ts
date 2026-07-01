import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import cardRoutes from "./routes/cardRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(morgan("dev")); // HTTP request logger
app.use(express.json());

// Routes
app.use("/api/cards", cardRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});