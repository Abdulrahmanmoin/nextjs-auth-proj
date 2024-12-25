import { connectDB } from "@/dbconfig/dbconfig";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const { token, newPassword } = reqBody;

        const user = await User.findOne({ forgotPasswordToken: token })

        if (!user) {
            return NextResponse.json({ message: "Token is not valid" }, { status: 500 })
        }

        if (Date.now() <= user.forgotPasswordTokenExpiry) {

            const newEncryptPassword = await bcrypt.hash(String(newPassword), 10)

            user.password = newEncryptPassword;

            user.forgotPasswordToken = undefined;
            user.forgotPasswordTokenExpiry = undefined;


        } else if (Date.now() > user.forgotPasswordTokenExpiry) {
            return NextResponse.json({ message: "Token is expired." }, { status: 400 });
        }

        await user.save();

        return NextResponse.json({ data: user }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}