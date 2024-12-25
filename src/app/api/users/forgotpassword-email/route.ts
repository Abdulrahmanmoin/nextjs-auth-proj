import { connectDB } from "@/dbconfig/dbconfig";
import { sendMail } from "@/utils/mailer";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const { email } = reqBody;

        sendMail(email, "Reset password");

        return NextResponse.json({ message: "email send successfully" }, { status: 200 })

    }  catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}