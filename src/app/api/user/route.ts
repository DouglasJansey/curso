import { NextResponse } from "next/server";
import UserConroller from "../../../../controller/userController/userController";

const userConroller = new UserConroller();

export async function GET() {
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
export async function POST(req: Request) {
    const body = await req.json()
    const newUser = await userConroller.createUser(body);
    return NextResponse.json( body, { status: 200 });
}
