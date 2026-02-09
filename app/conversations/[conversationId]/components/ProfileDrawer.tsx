import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import useOtherUser from "@/app/hooks/useOtherUser";
import { HiTrash } from "react-icons/hi";
import { Conversation,User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { format } from "date-fns";
import { useMemo } from "react";
import Avatar from "@/app/components/Avatar";
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
  const router = useRouter();
  const otherUser = useOtherUser(data);

  const [loading, setLoading] = useState(false);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return "Active";
  }, [data]);

  const title = useMemo(() => {
    return data.name || otherUser?.name;
  }, [data.name, otherUser?.name]);

  const handleDeleteConversation = async () => {
    try {
      await axios.delete(`/api/conversations/${data.id}`);
      onClose();
      router.push("/conversations");
      router.refresh();
    } catch (error) {
      console.error("DELETE_CONVERSATION_ERROR", error);
    }
  };

  return (
    <div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          {/* Drawer container */}
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                {/* Drawer panel */}
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel
                    className="
                    pointer-events-auto
                    w-screen
                    max-w-md
                    h-full
                    bg-white
                    shadow-xl
                    p-6
                  "
                  >
                    <div className="flex flex-col h-full">
                      <DialogTitle className="text-lg font-semibold select-none">
                        {title}
                      </DialogTitle>
                      <div className="flex flex-col items-center justify-center mt-6">
                        <Avatar user={otherUser} />
                        <p className="text-sm text-gray-500 mt-2 select-none pb-2">
                          {statusText}
                        </p>
                        <button
                          onClick={handleDeleteConversation}
                          disabled={loading}
                          className="
                        flex items-center justify-center gap-2
                        w-full
                        px-4 py-2
                        rounded-md
                        bg-red-50
                        text-red-600
                        hover:bg-red-500
                        hover:text-white
                        cursor-pointer
                        transition
                      "
                        >
                          <HiTrash size={18} />
                          {loading ? "Deleting ..." : "Delete conversation"}
                        </button>
                      </div>

                      <div className="mt-6 flex-1">
                        {/* Profile content here */}
                        <p className="text-sm text-gray-600">
                          Profile information goes here
                        </p>
                        <div className="mt-6 flex-1 overflow-y-auto">
                          <h3 className="text-sm font-semibold text-gray-500 mb-3 select-none">
                            Conversation Members
                          </h3>

                          <div className="flex flex-col gap-3">
                            {data.users.map((user) => (
                              <div
                                key={user.id}
                                className="flex items-center gap-3 p-2 rounded-md  transition"
                              >
                                <Avatar user={user} />

                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-gray-800 select-none">
                                    {user.name || "Unknown"}
                                  </span>
                                  <span className="text-xs text-gray-500 select-none">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={onClose}
                          className="w-full px-4 py-2 select-none rounded-md bg-gray-100 hover:bg-gray-300 hover:cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </DialogPanel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
