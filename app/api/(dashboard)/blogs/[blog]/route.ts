import connect from "@/app/lib/db";
import blog from "@/app/lib/modals/blog";
import Category from "@/app/lib/modals/category";
import User from "@/app/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: { params: any }) => {
  const blogId = context.params.blog;
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    if (!userId) {
      return new NextResponse("Invalid or Missing userId", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Invalid or Missing categoryId", { status: 400 });
    }

    if (!blogId) {
      return new NextResponse("Invalid or Missing blogId", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);
    const category = await Category.findById(categoryId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const thisBlog = await blog.findOne({
      _id: blogId,
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(categoryId),
    });

    if (!thisBlog) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    return new NextResponse(thisBlog, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const PATCH = async (req: Request, context: { params: any }) => {
  const blogId = context.params.blog;
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    if (!userId) {
      return new NextResponse("Invalid or Missing userId", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Invalid or Missing categoryId", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);
    const category = await Category.findById(categoryId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const thisBlog = await blog.findOne({
      _id: blogId,
      user: userId,
      category: categoryId,
    });

    if (!thisBlog) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    const body = await req.json();
    const { title, description } = body;

    const updatedBlog = await blog.findByIdAndUpdate(
      blogId,
      { title, description },
      { new: true }
    );
    updatedBlog.save();

    return new NextResponse(updatedBlog, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (req: Request, context: { params: any }) => {
  const blogId = context.params.blog;
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    if (!userId) {
      return new NextResponse("Invalid or Missing userId", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Invalid or Missing categoryId", { status: 400 });
    }

    if (!blogId) {
      return new NextResponse("Invalid or Missing blogId", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);
    const category = await Category.findById(categoryId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const thisBlog = await blog.findOne({
      _id: blogId,
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(categoryId),
    });

    if (!thisBlog) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    await blog.findByIdAndDelete(blogId);

    return new NextResponse("Blog deleted successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
