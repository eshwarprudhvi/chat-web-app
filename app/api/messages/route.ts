import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized");
    }
    const newMessage = await client.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
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

    const updatedConversation = await client.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessage: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });
    return NextResponse.json(newMessage); // nextresponse.json() is a method where as new Nextresponse is a constrcuctore invokign
  } catch (error) {
    console.log(
      "error in the page route.ts in api/messages/route.ts \n",
      error
    );
    return new NextResponse("Internal Error", { status: 500 });
  }
}
