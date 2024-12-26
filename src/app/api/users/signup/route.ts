import { connectDB } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model.js"
import bcrypt from "bcryptjs"
import { sendMail } from "@/utils/mailer";
import { DB_NAME } from "../../../../../constants";

connectDB();

export async function POST(request: NextRequest) {
    try {
        console.log("Let's start");

        console.log(`"MONGO_URI: ", ${process.env.MONGO_URI!}/${DB_NAME}${process.env.MONGO_URI_PARAMETERS}`);
        
        
        const start = Date.now(); 
        const { email, username, password } = await request.json()

        console.log('Start database query findone-email');
        
        const user = await User.findOne({ email })
                                    
        const findOneEmailQueryTime = Date.now() - start; 
        console.log(`Database query of finding by email completed in ${findOneEmailQueryTime}ms`);


        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const encryptPassword = await bcrypt.hash(String(password), 10)

        console.log('Start database query of sending email');
        const start2 = Date.now();


        sendMail(email, "Verify your email").catch((err) => console.error("Failed to send email:", err));

        console.log(`Database query of sending email: ${  Date.now() - start2}ms`);


        console.log('Start database query of creating a user');
        const start3 = Date.now();


        const newUser = await User.create({ email, username, password: encryptPassword })

        console.log(`Database query of creating a user completed in ${  Date.now() - start3}ms`);

        return NextResponse.json({ message: "User created succesfully", newUser }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}