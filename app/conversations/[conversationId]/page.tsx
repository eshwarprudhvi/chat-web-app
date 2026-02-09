import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import Header from "./components/Header";
import EmptyBox from "@/app/components/EmptyBox";
import Body from "./components/Body";
import Form from "./components/Form";
import Loader from "@/app/components/Loader";
interface Iparams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: Iparams }) => {
  const { conversationId } = await params;

  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  // console.log(conversationId);

  if (!conversation) {
    return (
      <div className=" h-full">
        <div className="h-full flex flex-col">
          <EmptyBox text={"No Conversation Yet"} />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Header conversation={conversation} />
      <Body initialMessages={messages} />
      <Form />
    </div>
  );
};

export default ConversationId;
