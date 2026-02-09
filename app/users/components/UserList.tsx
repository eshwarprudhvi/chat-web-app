"use client";
import { User } from "@prisma/client";
import React, { useEffect } from "react";
import UserBox from "./UserBox";
import { IoIosSearch } from "react-icons/io";

import { useState } from "react";
interface UserList {
  items: User[];
}
export default function UserList({ items }: UserList) {
  // console.log(items);
  const [search, setSearch] = useState("");

  const filteredUsers = items.filter((user) => {
    const query = search.toLowerCase().trim();

    if (user?.name?.toLowerCase().includes(query)) {
      return true;
    }
    if (user?.email?.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  });

  return (
    <div className="w-full pt-3">
      <div className="p-4">
        <div className="relative bg-white">
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2  rounded-lg focus:outline-none "
          />
        </div>
      </div>
      {filteredUsers.map((item) => (
        <div key={item.id}>
          <UserBox user={item} />
        </div>
      ))}
    </div>
  );
}
