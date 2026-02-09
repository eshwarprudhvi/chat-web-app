import client from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }
    const conversation = await client.conversation.findUnique({
      where: { id: conversationId },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error) {
    console.log("error at getConversationById");
    console.log(error);
    return null;
  }
};

export default getConversationById;
