import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is not defined>>>>>>>>>>")
            throw new Error("MONGO_URL is not defined in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
        })
        console.log("MongoDB connected successfully")
    }
    catch (error) {
        console.error("MongoDB connection error:", error.message)
        process.exit(1)
    }
}