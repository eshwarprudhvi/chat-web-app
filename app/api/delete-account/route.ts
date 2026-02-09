import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    await client.user.delete({
      where: { id: currentUser.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json("Deletion of account failed", { status: 500 });
  }
}
