import client from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";

async function getConversations() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await client.conversation.findMany({
      where: {
        users: {
          some: { id: currentUser.id },
        },
      },
      include: {
        users: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        lastMessage: "desc",
      },
    });

    return conversations;
  } catch (error) {
    return [];
  }
}

export default getConversations;
