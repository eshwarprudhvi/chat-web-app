import Sidebar from "../components/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";
export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <>
      <main className="h-full flex flex-row">
        <Sidebar>
          <UserList items={users} />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </Sidebar>
      </main>
    </>
  );
}
