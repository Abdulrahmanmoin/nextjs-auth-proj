import { connectDB } from "@/dbconfig/dbconfig";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

connectDB()

export async function GET() {
    try {

        cookies().delete("token")

        return NextResponse.json({ message: "Logout succesfully" }, { status: 200 })

    }  catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}