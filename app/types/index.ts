import { Message, User } from "@/app/generated/prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};
