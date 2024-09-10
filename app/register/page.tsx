import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { redirect } from "next/navigation";
import RegisterForm from "./Form";
import React from "react";
import { syncBuiltinESMExports } from "module";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
};
export default page;
