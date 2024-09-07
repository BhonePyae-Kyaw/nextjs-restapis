"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"; // Import the Image component from the correct package
type Props = {};

const Dashboard = (props: Props) => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div>
      {session ? (
        <div>
          <h1>Dashboard</h1>
          <p>Welcome {session?.user?.email}</p>
          <div>
            <img
              alt="profile picture"
              src={session?.user?.image as string}
              className="w-24 h-24 rounded-full"
            />
          </div>
          <button
            className="p-2 bg-red-500 text-white rounded-lg mt-4"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <p>You are not logged in. Please log in with google or github.</p>
          <div className="flex gap-4">
            <div
              onClick={() => signIn("google")}
              className="text-center w-[180px] p-2 rounded-lg bg-slate-500 cursor-pointer"
            >
              Google
            </div>
            <div
              onClick={() => signIn("github")}
              className="text-center  w-[180px] p-2 rounded-lg bg-green-500 cursor-pointer"
            >
              Github
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
