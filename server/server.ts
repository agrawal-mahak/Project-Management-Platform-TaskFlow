import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import cardRoutes from "./routes/cardRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));

// Middleware
app.use(morgan("dev")); // HTTP request logger
app.use(express.json());

// Routes
app.use("/api/cards", cardRoutes);
app.use("/api/auth", authRoutes);
// Add this near your other app.use statements
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});