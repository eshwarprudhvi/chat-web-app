import React from "react";
import SidebarNavigations from "./SidebarNavigations";
import { RiMessage2Fill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import Avatar from "./Avatar";
import { User } from "../generated/prisma/client";
interface DesktopSideBarProps {
  currentUser: User | null;
}
const DesktopSideBar: React.FC<DesktopSideBarProps> = ({ currentUser }) => {
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
        <div>
          <Avatar user={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default DesktopSideBar;
