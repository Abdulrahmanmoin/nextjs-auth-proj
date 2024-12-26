import { connectDB } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model.js"
import bcrypt from "bcryptjs"
import { sendMail } from "@/utils/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {

  

        const { email, username, password } = await request.json()

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const encryptPassword = await bcrypt.hash(String(password), 10)

        await sendMail(email, "Verify your email")

        const newUser = await User.create({ email, username, password: encryptPassword })

        return NextResponse.json({ message: "User created succesfully", newUser }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}