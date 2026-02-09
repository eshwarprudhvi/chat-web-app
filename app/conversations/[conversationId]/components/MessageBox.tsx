import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import ImageModal from "@/app/components/ImageModal";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";
import Image from "next/image";
interface MessageBoxProps {
  message: FullMessageType;
  isLast?: boolean;
}
export default function MessageBox({ message, isLast }: MessageBoxProps) {
  const session = useSession();
  const [isImageOpen, setIsImageOpen] = useState(false);

  const isOwnMessage = useMemo(() => {
    return session.data?.user?.email === message.sender.email;
  }, [session.data?.user?.email, message.sender.email]);
  const seenList = (message.seen || [])
    .filter((user) => user.email != message.sender.email)
    .map((user) => user.name)
    .join(", ");
  // console.log("from message box\n", session);

  //styles
  const body = clsx("flex flex-col gap-2", isOwnMessage && "items-end");
  const avatar = clsx(isOwnMessage && "order-2");
  const container = clsx("flex gap-3 p-4", isOwnMessage && "justify-end");
  const messagestyle = clsx(
    "text-sm w-fit overflow-hidden",
    isOwnMessage ? "bg-gray-500 text-white" : "bg-gray-100",
    message.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={message.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
        </div>
        <div className={messagestyle}>
          {message.image ? (
            <>
              <Image
                alt="image"
                height={288}
                width={288}
                src={message.image}
                onClick={() => setIsImageOpen(true)}
                className="
      object-cover
      cursor-pointer
      rounded-md
      hover:opacity-90
      transition
    "
              />

              <ImageModal
                isOpen={isImageOpen}
                src={message.image}
                onClose={() => setIsImageOpen(false)}
              />
            </>
          ) : (
            <div>{message.body}</div>
          )}
        </div>
        {isLast && isOwnMessage && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-700">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
}
