import mongoose from "mongoose";

const connectDb = async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });   
    console.log("Database connected...")
}

export default connectDb;

