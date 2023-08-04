import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://testTest:000000T@wearables.xfq2gse.mongodb.net/wearables");
        console.log(`Connected To Mongodb Database ${conn.connection.host}`.bgMagenta.white);
        
    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;

