import DeleteUser from "@/components/DeleteUser";
import ReturnButton from "@/components/ReturnButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "ADMIN") {
    return (
      <main className=" px-8 py-16 mx-auto container max-w-screen space-y-8 ">
        <div className="space-y-4">
          <ReturnButton label="Profile" href="/profile" />
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        </div>

        <p className="text-xl px-5 py-3 text-white bg-red-500 rounded-[10px]">
          You are forbidden to use this Page, you are not admin dude.
        </p>
      </main>
    );
  }
  const users = await prisma.user.findMany({
    orderBy: {
      role: "desc",
    },
  });
  return (
    <main className=" px-8 py-16 mx-auto container max-w-screen space-y-8 ">
      <div className="space-y-4">
        <ReturnButton label="Profile" href="/profile" />
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      </div>

      <p className="text-xl px-5 py-3 text-white bg-green-500 rounded-[10px]">
        welcome you are ad admin
      </p>

      <div className="w-full py-5">
        <table className="w-full  ">
          <thead>
            <tr className="flex border-b border-black/10 gap-[10px] justify-between w-full">
              <th className="text-center font-bold">ID</th>
              <th className="text-center font-bold">Name</th>
              <th className="text-center font-bold">Email</th>
              <th className="text-center font-bold">Role</th>
              <th className="text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((each, index) => {
              if (each.id === session.user.id) return;
              return (
                <tr
                  key={index}
                  className="flex border-b border-black/10 gap-[10px] justify-between w-full py-6"
                >
                  <td className="text-sm text-black">{each.id.slice(0, 8)}</td>
                  <td className="text-sm text-black">{each.name}</td>
                  <td className="text-sm text-black">{each.email}</td>
                  <td className="text-sm text-black">{each.role}</td>
                  <td className="text-sm text-black">
                    <DeleteUser userId={each.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
