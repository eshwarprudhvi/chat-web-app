import client from "@/lib/prisma";
import Email from "next-auth/providers/email";

//we use get seesion to get the current user so that we get all the other users except this user
import getSession from "./getSession";
import getCurrentUser from "./getCurrentUser";
const getUsers = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.email) {
    return [];
  }

  try {
    const users = await client.user.findMany({
      where: {
        NOT: {
          email: currentUser?.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // console.log(users);
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUsers;
