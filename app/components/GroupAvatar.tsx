"use client";
import { User } from "@prisma/client";
import Image from "next/image";
interface GroupAvatarProps {
  users: User[];
}

export default function GroupAvatar({ users }: GroupAvatarProps) {
  const displayedUsers = users.slice(0, 3);
  const remainingUsersCount = users.length - displayedUsers.length;

  return (
    <div className="relative w-10 h-10">
      {displayedUsers.map((user, ind) => (
        <div
          key={user.id}
          className="absolute rounded-full overflow-hidden border-2 border-white "
          style={{ left: `${ind * 12}px`, zIndex: 10 - ind }}
        >
          <Image
            src={user.image || "/images/avatar.jpg"}
            width={32}
            height={32}
            className="object-cover"
            alt={user.name || "user"}
          />
        </div>
      ))}
      {/* {remainingUsersCount > 0 && (
        <div
          className="absolute flex items-center justify-center w-8 h-8 bg-gray-300 text-xs text-gray-600 border-2 border-white"
          style={{ left: `${displayedUsers.length * 12}px` }}
        >
          +{remainingUsersCount}
        </div>
      )} */}
    </div>
  );
}
