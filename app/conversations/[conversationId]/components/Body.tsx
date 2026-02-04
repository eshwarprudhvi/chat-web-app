"use client";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  console.log("console form the body.tsx", initialMessages);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((message, ind) => (
        <MessageBox
          message={message}
          key={message.id}
          isLast={ind === messages.length - 1}
        />
      ))}

      <div ref={bottomRef} className="pt-24"></div>
    </div>
  );
};

export default Body;
