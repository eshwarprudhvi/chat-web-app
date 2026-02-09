import Sidebar from "../components/Sidebar";
import getCurrentUser from "../actions/getCurrentUser";
import getConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";
import { redirect } from "next/navigation";
import GroupChatModal from "./components/GroupChatModal";
import getUsers from "../actions/getUsers";
export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  if (conversations.length == 0) {
    // console.log("empty conversation");
  } else {
    // console.log(conversations);
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="w-full flex  md:flex-row h-full overflow-hidden">
      <Sidebar>
        <div
          className="h-full w-full 
         flex bg-gray-50 "
        >
          <ConversationList
            conversations={conversations}
            currentUserId={currentUser.id}
            currentUserEmail={currentUser.email}
          />
        </div>
      </Sidebar>
      <div className="w-full h-full overflow-hidden">{children}</div>
      <GroupChatModal users={users} />
    </div>
  );
}
