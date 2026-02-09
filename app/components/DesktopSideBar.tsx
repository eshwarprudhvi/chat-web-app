"use client";
import React from "react";
import SidebarNavigations from "./SidebarNavigations";
import { RiMessage2Fill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import Avatar from "./Avatar";
import { User } from "@prisma/client";
import { useState } from "react";
import ProfileDrawer from "./ProfileDrawer";
interface DesktopSideBarProps {
  currentUser: User | null;
}
const DesktopSideBar: React.FC<DesktopSideBarProps> = ({ currentUser }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="hidden min-h-screen  py-4 text-center justify-center  h-full w-16  md:flex   z-20 bg-white">
      <div className="flex flex-col justify-between items-center space-y-2 ">
        <div className="flex-1">
          <SidebarNavigations
            path="/conversations"
            href="/conversations"
            icon={<RiMessage2Fill />}
          />
          <SidebarNavigations path="/users" href="/users" icon={<FaUser />} />
          <SidebarNavigations path="/logout" href="#" icon={<TbLogout />} />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsProfileOpen(true);
          }}
        >
          <Avatar user={currentUser} />
        </div>
      </div>
      {currentUser && (
        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default DesktopSideBar;
