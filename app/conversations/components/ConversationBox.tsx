"use client";
import React, { useMemo } from "react";
import { User, Conversation, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import GroupAvatar from "@/app/components/GroupAvatar";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
  conversation: Conversation & {
    users: User[];
    messages: Message[];
  };
  currentUserId: string;
}
const ConversationBox = ({
  conversation,
  currentUserId,
}: ConversationBoxProps) => {
  const router = useRouter();

  // console.log(conversation.messages[0]);
  const otherUser = conversation?.users?.find(
    (user) => user.id !== currentUserId
  );

  const lastMessage = conversation.messages?.[0];

  let lastMessageText = "start a new conversation here";

  if (lastMessage) {
    if (lastMessage.body) {
      lastMessageText = lastMessage.body;
    } else if (lastMessage.image) {
      lastMessageText = "📷 Image";
    }
  }

  // console.log(conversation.messages);
  const handleClick = () => {
    router.push(`/conversations/${conversation.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-3 mb-1  bg-white rounded-sm hover:bg-gray-100 cursor-pointer"
    >
      {conversation.isGroup ? (
        <GroupAvatar
          users={conversation.users.filter((user) => user.id != currentUserId)}
        />
      ) : (
        otherUser && <Avatar user={otherUser} />
      )}

      <div className="ml-3 flex-1">
        <p className="font-medium text-gray-800">
          {conversation.isGroup
            ? conversation.name
            : otherUser?.name || "Unknown User"}
        </p>

        <p className="text-sm text-gray-500 truncate">{lastMessageText}</p>
      </div>
    </div>
  );
};

export default ConversationBox;
