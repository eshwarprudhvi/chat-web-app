import React from "react";
import DesktopSideBar from "./DesktopSideBar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "../actions/getCurrentUser";
export default async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  // console.log(currentUser);
  return (
    <div className="w-full flex flex-row h-full md:w-1/3 bg-gray-50">
      <DesktopSideBar currentUser={currentUser} />
      <div className="w-full">{children}</div>
      <MobileFooter currentUser={currentUser} />
    </div>
  );
}
