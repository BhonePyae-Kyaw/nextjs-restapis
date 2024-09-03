import connect from "@/app/lib/db";
import User from "@/app/lib/modals/user";
import { NextResponse } from "next/server";
import Category from "@/app/lib/modals/category";
import { Types } from "mongoose";
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse("Invalid or Missing userId", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const categories = await Category.find({
      user: new Types.ObjectId(userId),
    });

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Invalid or Missing userId", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const category = new Category({ title, user: new Types.ObjectId(userId) });

    await category.save();

    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
