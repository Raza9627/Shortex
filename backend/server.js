import express from "express";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import shortUrlRoutes from "./routes/shortUrlRoute.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", shortUrlRoutes);
app.use("/api/urls", urlRoutes);
app.use("/api/auth", authRoutes);

connectDB();

export default app;