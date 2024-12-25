import { connectDB } from "@/dbconfig/dbconfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const {token} = reqBody;

        console.log(token);

        const user = await User.findOne({ verifyToken: token })

        if (!user) {
            return NextResponse.json({ message: "Token is not correct" }, { status: 400 });
        }

        if (Date.now() <= user.verifyTokenExpiry) {

            user.isVerified = true;

            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;

            await user.save();
        }
        else if (Date.now() > user.verifyTokenExpiry) {
            return NextResponse.json({ message: "Token is expired! Signup again." }, { status: 400 });
        }

        return NextResponse.json({ message: "User verified successfully." }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}