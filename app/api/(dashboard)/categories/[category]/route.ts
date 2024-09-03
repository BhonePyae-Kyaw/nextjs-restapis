import { NextResponse } from "next/server";
import connect from "../../../../lib/db";
import Category from "@/app/lib/modals/category";
import User from "@/app/lib/modals/user";

export const PATCH = async (req: Request, context: { params: any }) => {
  const categoryId = context.params.category;
  try {
    const body = await req.json();
    const { title } = body;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return new NextResponse("Invalid or Missing userId", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Invalid or Missing categoryId", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title },
      { new: true }
    );

    return new NextResponse(updatedCategory, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (req: Request, context: { params: any }) => {
  const categoryId = context.params.category;
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return new NextResponse("Invalid or Missing userId", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Invalid or Missing categoryId", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    await Category.findByIdAndDelete(categoryId);

    return new NextResponse("Category deleted successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
