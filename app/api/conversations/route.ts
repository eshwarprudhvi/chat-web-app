import client from "@/lib/prisma";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { requestBody } = body;
    const { userIds, isGroup = false, name } = requestBody;

    if (!userIds || !Array.isArray(userIds)) {
      return NextResponse.json("Invalid data");
    }

    if (userIds.length === 0) {
      return NextResponse.json("userIds array can't be empty");
    }
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json("Unauthenticated");
    }

    //for 1-1 conversation
    if (!isGroup && userIds.length === 1) {
      const otherUserId = userIds[0];
      //check if there is already 1-1 conversation exists
      const existingConnection = await client.conversation.findFirst({
        where: {
          isGroup: false,
          AND: [
            { users: { some: { id: currentUser.id } } },
            { users: { some: { id: otherUserId } } },
          ],
        },
        include: {
          users: true,
        },
      });

      if (existingConnection) {
        return NextResponse.json(existingConnection);
      }

      const alluserIds = [...userIds, currentUser.id];

      const newConversation = await client.conversation.create({
        data: {
          isGroup: isGroup,
          name: isGroup ? "Group chat" : null,
          users: {
            connect: alluserIds.map((id) => ({ id })),
          },
        },
        include: {
          users: true,
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
          },
        }, // adding new code here
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(
            user.email,
            "conversation:update",
            newConversation
          );
        }
      });

      return NextResponse.json(newConversation);
    }

    //group conversation
    if (isGroup) {
      if (!name || typeof name !== "string") {
        return NextResponse.json("Group name is required", { status: 400 });
      }
      if (userIds.length <= 2) {
        return NextResponse.json("Group should contain atleast 3 members");
      }

      const newGroupConversation = await client.conversation.create({
        data: {
          name: name,
          isGroup: true,
          users: {
            connect: [{ id: currentUser.id }, ...userIds.map((id) => ({ id }))],
          },
        },
        include: {
          users: true,
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
          },
        },
      });
      newGroupConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(
            user.email,
            "conversation:update",
            newGroupConversation
          );
        }
      });

      revalidatePath("/conversations");

      return NextResponse.json(newGroupConversation);
    }
    return NextResponse.json("Invalid request", { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
