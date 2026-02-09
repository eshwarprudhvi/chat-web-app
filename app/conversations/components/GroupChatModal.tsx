"use client";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import useGroupChatModal from "@/app/hooks/useGroupChatModal";

interface GroupChatModalProps {
  users: User[];
}

export default function GroupChatModal({ users }: GroupChatModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { isOpen, onClose } = useGroupChatModal();

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id != userId)
        : [...prev, userId]
    );
  };

  const onCreate = async () => {
    if (!name || selectedUsers.length < 2) {
      toast.error("Group name is required and atleast 3 members required");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/conversations", {
        requestBody: {
          name,
          isGroup: true,
          userIds: selectedUsers,
        },
      });
      console.log("res is ", res);
      toast.success("group created");
      router.refresh();
      //@ts-ignore
      //   router.push(`/api/conversations/${res.data.id}`);
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white rounded-lg p-6">
            <DialogTitle className="text-lg font-semibold">
              Create Group Chat
            </DialogTitle>

            {/* Group name */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Group name"
              className="w-full border rounded-md p-2 mt-4"
            />

            {/* Users list */}
            <div className="mt-4 max-h-48 overflow-y-auto space-y-2">
              {users.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                  />
                  <span>{user.name}</span>
                </label>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={onClose}
                className="flex-1 py-2 bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={onCreate}
                disabled={loading}
                className="flex-1 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
