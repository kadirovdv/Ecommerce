import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);

        console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error}`.red.bold);
        process.exit(1);
    }
}


export default connectDB;