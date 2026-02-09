"use client";
import { Conversation, User } from "../../generated/prisma/client";
import ConversationBox from "./ConversationBox";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { IoIosSearch } from "react-icons/io";
import { HiUserAdd } from "react-icons/hi";
import { Message } from "../../generated/prisma/client";
import { useEffect, useState } from "react";
import useGroupChatModal from "@/app/hooks/useGroupChatModal";
import { pusherClient } from "@/lib/pusher";

interface ConversationListProps {
  conversations: (Conversation & {
    users: User[];
    messages: Message[];
  })[];
  currentUserId: string;
  currentUserEmail: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentUserId,
  currentUserEmail,
}: ConversationListProps) => {
  //---------------search option-------start-------
  // const [search, setSearch] = useState("");
  // const filteredConversations = conversations.filter((conversation) => {
  //   const query = search.toLowerCase().trim();

  //   if (conversation?.name?.toLowerCase().includes(query)) {
  //     return true;
  //   }
  //   return false;
  // });

  //--------------serach option ----end

  const [items, setItems] = useState(conversations);

  const { onOpen } = useGroupChatModal();

  useEffect(() => {
    if (!currentUserEmail) return;

    const handler = (data: {
      id: string;
      messages: Message[];
      users: User[];
    }) => {
      setItems((current) => {
        const updated = current.find((c) => c.id === data.id);
        if (!updated) return current;

        const rest = current.filter((c) => c.id !== data.id);

        return [
          {
            ...updated,
            messages: data.messages,
            users: data.users,
            lastMessage: new Date(),
          },
          ...rest,
        ];
      });
    };

    pusherClient.subscribe(currentUserEmail);
    pusherClient.bind("conversation:update", handler);

    return () => {
      pusherClient.unsubscribe(currentUserEmail);
      pusherClient.unbind("conversation:update", handler);
    };
  }, [currentUserEmail]);
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-lg font-semibold cursor-default select-none">
          Messages
        </h3>
        <HiUserAdd
          size={20}
          onClick={onOpen}
          className="cursor-pointer transition-all duration-200 rounded-4xl  hover:text-black "
        />
      </div>
      {/* start */}
      {/* <div className="p-4">
        <div className="relative bg-white">
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2  rounded-lg focus:outline-none "
          />
        </div>
      </div> */}

      {/* end */}
      <div className="mt-3">
        {items.map((conversation) => (
          <ConversationBox
            conversation={conversation}
            currentUserId={currentUserId}
            key={conversation.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
