export const runtime = "nodejs";
import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { name, image } = body;

    const updatedUser = await client.user.update({
      where: { id: currentUser.id },
      data: {
        ...(name !== undefined && { name }),
        ...(image !== undefined && { image }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json("Error updating profile", { status: 500 });
  }
}
