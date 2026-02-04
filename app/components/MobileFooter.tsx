import React from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import SidebarNavigations from "./SidebarNavigations";
import Avatar from "./Avatar";
import { User } from "../generated/prisma/client";

interface MobileFooterProps {
  currentUser: User | null;
}
export default function MobileFooter({ currentUser }: MobileFooterProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t py-3 px-4">
      <div className="flex justify-between items-center">
        <div className="text-center">
          <SidebarNavigations
            path="/users"
            href="/users"
            icon={<RiMessage2Fill size={24} />}
          />
        </div>

        <div className="text-center">
          <SidebarNavigations
            path="/conversations"
            href="/conversations"
            icon={<FaUser size={22} />}
          />
        </div>

        <div className="text-center">
          <SidebarNavigations
            path="/logout"
            href="#"
            icon={<TbLogout size={24} />}
          />
        </div>
        <div className="text-center">
          <Avatar user={currentUser} />
        </div>
      </div>
    </div>
  );
}
