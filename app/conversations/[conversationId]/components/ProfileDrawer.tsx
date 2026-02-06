"use client";
import { Conversation, User } from "@/app/generated/prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { format } from "date-fns";
import { useMemo } from "react";
interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}
export default function ProfileDrawer({
  isOpen,
  onClose,
  data,
}: ProfileDrawerProps) {
  const otherUser = useOtherUser(data);
  //   const joinedDate = useMemo(() => {
  //     // return format(new Date(otherUser.createdAt), "PP");
  //   }, [otherUser?.createdAt]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return "Active";
  }, [data]);

  const title = useMemo(() => {
    return data.name || otherUser?.name;
  }, [data.name, otherUser?.name]);

  return <div></div>;
}
