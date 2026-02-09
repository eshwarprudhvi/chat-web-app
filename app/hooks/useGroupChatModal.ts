"use client";
import { create } from "zustand";
interface GroupChatModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useGroupChatModal = create<GroupChatModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useGroupChatModal;
