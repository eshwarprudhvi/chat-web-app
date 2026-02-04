"use client";
import { Conversation, User } from "@/app/generated/prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

export default function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);

  return (
    <div>
      <h1>header</h1>
    </div>
  );
}
