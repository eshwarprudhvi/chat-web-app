export const runtime = "nodejs";

import client from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

interface Iparams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<Iparams> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { conversationId } = await params;
    if (!conversationId) {
      return new NextResponse("Invalid ConversationID", { status: 400 });
    }
    const conversation = await client.conversation.findFirst({
      where: {
        id: conversationId,
        users: {
          some: {
            id: currentUser.id,
          },
        },
      },
      include: { users: true },
    });
    if (!conversation) {
      return new NextResponse("Conversaiton doesn't exist", { status: 404 });
    }

    await client.conversation.delete({
      where: {
        id: conversationId,
      },
    });

    // conversation.users.forEach((user) => {
    //   pusherServer.trigger(user.email!, "conversation:remove", {
    //     id: conversationId,
    //   });
    // });
    //newcode
    conversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:remove", {
          id: conversationId,
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(
      "error in the /api/conversations/[conversaitonid]/route.ts\n",
      error
    );
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
