export const runtime = "nodejs";

import bcrypt from "bcryptjs";
import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;
    if (!email || !password || !name) {
      return new NextResponse("Missing Credentials", { status: 400 });
    }
    const existingUser = await client.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (e: any) {
    console.log(e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
