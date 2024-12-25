import { connectDB } from "@/dbconfig/dbconfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User does not exists" }, { status: 400 })
        }

        const dbPassword = user.password;

        const dcryptPassword = await bcrypt.compare(String(password), dbPassword)

        if (!dcryptPassword) {
            return NextResponse.json({ message: "Wrong credentials" }, { status: 400 })
        }

        const jwtToken = jwt.sign({ id: user._id }, process.env.TOKEN_PRIVATE_KEY!, { expiresIn: "2h" })

        cookies().set("token", jwtToken)
        return NextResponse.json({ message: "Login succesfully", user }, { status: 200 })

    }  catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}