import mongoose from "mongoose";
import { DB_NAME } from "../../constants";

export async function connectDB() {
    try {
        
        await mongoose.connect(`${process.env.MONGO_URI!}/${DB_NAME}${process.env.MONGO_URI_PARAMETERS}`)

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("DB connected successfully");
        })

        connection.on("error" , (error) => {
            console.log("DB connect error: ", error);
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong while connecting a DB", error);     
        process.exit()
    }
}