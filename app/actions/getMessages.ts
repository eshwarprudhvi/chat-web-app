import client from "@/lib/prisma";

const getMessages = async (conversationId: string) => {
  try {
    const messages = await client.message.findMany({
      where: { id: conversationId },
      include: {
        seen: true,
        sender: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error) {
    return [];
  }
};

export default getMessages;
