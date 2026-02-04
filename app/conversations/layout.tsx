import Sidebar from "../components/Sidebar";
import getConversations from "../actions/getConversations";
import getCurrentUser from "../actions/getCurrentUser";
import ConversationList from "./components/ConversationList";
import { redirect } from "next/navigation";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/login");

  const conversations = await getConversations();

  return (
    <div className="h-full flex">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-1/3 border-r">
        <ConversationList
          conversations={conversations}
          currentUserId={currentUser.id}
        />
      </div>

      {/* MAIN CHAT CONTENT */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
