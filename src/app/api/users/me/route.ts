import { connectDB } from "@/dbconfig/dbconfig";
import { User } from "@/models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

connectDB()

export async function GET() {
    try {

        const token = cookies().get("token")

        if (!token) {
            return NextResponse.json({ message: "Token not found in cookies" }, { status: 500 })
        }

        const dcryptJwt = jwt.verify(token?.value, process.env.TOKEN_PRIVATE_KEY!) as JwtPayload

        const userId = dcryptJwt.id;

        const user = await User.findById(userId)

        return NextResponse.json({ data: user }, { status: 200 })

    }  catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}