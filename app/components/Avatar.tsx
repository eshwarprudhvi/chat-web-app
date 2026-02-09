"use client";
import Image from "next/image";
import getCurrentUser from "../actions/getCurrentUser";
import { User } from "@prisma/client";
interface AvatarProps {
  user?: User | null;
}
export default function Avatar({ user }: AvatarProps) {
  const image = user?.image || "/images/avatar.jpg";
  return (
    <div>
      <img
        src={image}
        alt="Avatar"
        className="rounded-full h-8 w-8 cursor-pointer"
      />
    </div>
  );
}
