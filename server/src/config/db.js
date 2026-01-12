import mongoose from "mongoose";


 const connectDB = async ()=>{
    try {
        const result = await mongoose.connect(process.env.MONGO_URI)
        console.log(" mongo DB is Connected at ", result.connection.host);
        
    } catch (error) {
        console.log("mongo DB Connection error ",error);
        process.exit(1);
    }
}



export default connectDB;