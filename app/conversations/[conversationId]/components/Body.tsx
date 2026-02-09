"use client";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  // console.log("console form the body.tsx", initialMessages);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    scrollToBottom();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (current.find((m) => m.id === message.id)) {
          return current;
        }
        return [...current, message];
      });
      scrollToBottom();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
      pusherClient.unsubscribe(conversationId);
    };
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
