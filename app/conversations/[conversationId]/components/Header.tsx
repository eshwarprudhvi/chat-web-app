"use client";
import { Conversation, User } from "@/app/generated/prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useMemo } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Avatar from "@/app/components/Avatar";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

export default function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 border-b bg-white">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Avatar user={otherUser} />

        <div className="flex flex-col">
          <span className="font-medium">
            {conversation.name || otherUser?.name}
          </span>

          <span className="text-sm text-gray-500">Active</span>
        </div>
      </div>

      {/* RIGHT */}
      <HiDotsHorizontal
        size={20}
        className="text-gray-500 cursor-pointer hover:text-black"
      />
    </div>
  );
}
