"use client";
import { User } from "../generated/prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

interface ConversationWithUsers {
  users: User[];
}
const useOtherUser = async (conversation: ConversationWithUsers) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    if (!currentUserEmail) {
      return null;
    }

    return conversation.users.find((user) => user.email !== currentUserEmail);
  }, [session?.data?.user?.email]);

  return otherUser;
};

export default useOtherUser;
