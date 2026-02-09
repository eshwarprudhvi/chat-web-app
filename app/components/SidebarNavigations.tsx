"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { signOut } from "next-auth/react";

interface Navgiations {
  href: string;
  icon: React.ReactNode;
  path: string;
}

export default function SidebarNavigations({ href, icon, path }: Navgiations) {
  const [isActive, setActive] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // console.log(pathname == path, path);
    if (pathname == path) {
      setActive(true);
    }
  }, [pathname]);

  const handleClick = () => {
    if (path == "/logout") {
      signOut();
      return;
    }
    router.push(href);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={` flex items-center justify-center
          h-10 w-10 rounded-xl
          transition-all duration-200
          ${
            isActive
              ? "text-black bg-gray-200"
              : "text-gray-500 hover:text-black hover:bg-gray-200"
          }
          cursor-pointer
       `}
      >
        {icon}
      </button>
    </div>
  );
}
