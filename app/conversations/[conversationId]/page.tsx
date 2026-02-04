import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import Header from "./components/Header";
interface Iparams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: Iparams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  console.log(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <p>Empty conversations</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header conversation={conversation} />
    </div>
  );
};

export default ConversationId;
