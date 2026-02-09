import { User } from "@prisma/client";
import axios from "axios";
import Avatar from "@/app/components/Avatar";
import { useRouter } from "next/navigation";
interface UserBoxProps {
  user: User;
}
function UserBox({ user }: UserBoxProps) {
  const router = useRouter();

  const handleClick = async () => {
    const requestBody = {
      userIds: [user.id],
      isGroup: false,
    };
    try {
      const response = await axios.post("/api/conversations", {
        requestBody,
      });
      //@ts-ignore
      router.push(`/conversations/${response.data.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-3 mb-1 outline-none border-none bg-white border focus:outline-none focus:ring-0 rounded-sm hover:bg-gray-100 cursor-pointer overflow-auto"
    >
      <Avatar user={user} />

      <div className="ml-3 flex-1">
        <p className="font-medium text-gray-800">{user.name || "No Name"}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}

export default UserBox;
