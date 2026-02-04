import { Conversation, User } from "../../generated/prisma/client";
import ConversationBox from "./ConversationBox";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { HiUserAdd } from "react-icons/hi";
import { Message } from "../../generated/prisma/client";

interface ConversationListProps {
  conversations: (Conversation & {
    users: User[];
    messages: Message[];
  })[];
  currentUserId: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentUserId,
}: ConversationListProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-lg font-semibold cursor-default select-none">
          Messages
        </h3>
        <HiUserAdd
          size={20}
          className="cursor-pointer transition-all duration-200 rounded-4xl  hover:text-black "
        />
      </div>
      <div className="mt-3">
        {conversations.map((conversation) => (
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
