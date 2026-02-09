import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

interface Iparams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: Iparams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = await params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthrized", { status: 401 });
    }

    const conversation = await client.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation doesnot exists", { status: 404 });
    }
    //
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const alreadySeen = lastMessage.seen.some(
      (user) => user.id === currentUser.id
    );
    if (alreadySeen) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await client.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log("error in conversaions/conversaionid", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
