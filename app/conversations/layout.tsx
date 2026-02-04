import Sidebar from "../components/Sidebar";
import getCurrentUser from "../actions/getCurrentUser";
import getConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";
import { redirect } from "next/navigation";
export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  if (conversations.length == 0) {
    console.log("empty conversation");
  } else {
    // console.log(conversations);
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <Sidebar>
        <div
          className="h-full w-full 
         flex bg-red-300"
        >
          <ConversationList
            conversations={conversations}
            currentUserId={currentUser.id}
          />
          {children}
        </div>
      </Sidebar>
    </div>
  );
}
