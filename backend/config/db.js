import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected success")
    }

    catch (error) {
        console.error("unable to connect", error);
        process.exit(1);
    }
}
