"use client";
import Avatar from "@/app/components/Avatar";
import GroupAvatar from "@/app/components/GroupAvatar";

import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useMemo, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";
import ProfileDrawer from "./ProfileDrawer";
import Link from "next/link";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

export default function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="w-full flex items-center justify-between px-4 py-3 border-b bg-white z-30">
        <div className="flex items-center gap-3">
          <Link
            href={"/conversations"}
            className="cursor-pointer flex items-center w-8 h-8 hover:bg-gray-300 rounded-full"
          >
            <IoChevronBack size={20} className="translate-x-1" />
          </Link>

          {conversation.isGroup ? (
            <GroupAvatar users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="ml-2 flex flex-col">
            <span className="font-medium text-gray-900">
              {conversation.name || otherUser?.name}
            </span>

            <span className="text-sm text-gray-500">{statusText}</span>
          </div>
        </div>
        <HiDotsHorizontal
          size={20}
          className="text-gray-500 cursor-pointer hover:text-black transition"
          onClick={() => setDrawerOpen(true)}
        />
      </div>
    </>
  );
}
