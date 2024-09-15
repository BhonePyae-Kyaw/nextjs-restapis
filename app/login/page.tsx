import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "./Form";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
};
export default page;
