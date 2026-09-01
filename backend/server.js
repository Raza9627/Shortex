import express from "express";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import shortUrlRoutes from "./routes/shortUrlRoute.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/", shortUrlRoutes);
app.use("/api/urls", urlRoutes);
app.use("/api/auth",authRoutes);
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});