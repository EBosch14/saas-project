import prismadb from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { getUser, getPermissions } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await prismadb.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) return redirect("/auth-callback?origin=dashboard");

  return (
    <div>
      <p>Dashboard Page. hello! {user.email}</p>
    </div>
  );
};

export default DashboardPage;
