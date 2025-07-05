import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import { connectDB } from "./utils/db.js";

// Load environment variables
dotenv.config();

const app = express()

// middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOption = {
    origin: ["http://localhost:5121", "http://localhost:3000", "http://localhost:5173", "http://localhost:4173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}

app.use(cors(corsOption))

const PORT = 5171;

app.use("/api/users", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);



// Add separate profile route for /api/profile/update
// import { updateProfile } from "./controllers/user.controller.js";
// import authenticateToken from "./middleware/isAuthenicated.js";
// app.post("/api/profile/update", authenticateToken, updateProfile);

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();