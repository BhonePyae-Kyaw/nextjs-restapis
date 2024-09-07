import { NextResponse } from "next/server";
import connect from "../../../lib/db";
import User from "@/app/lib/modals/user";
import { Types } from "mongoose";
const ObjectId = require("mongodb").ObjectId;
export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error in fetching users " + error.message }),
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connect();
    const user = new User(body);
    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error in creating user " + error.message }),
      { status: 500 }
    );
  }
};

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { id, newUserName } = body;
    await connect();
    if (!id || !newUserName) {
      return new NextResponse(
        JSON.stringify({ message: "id and newUserName are not found." }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ message: "id is not valid." }), {
        status: 400,
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { username: newUserName } },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error in updating user " + error.message }),
      { status: 500 }
    );
  }
};

// export const DELETE = async (req: Request) => {
//   try {
//     const body = await req.json();
//     const { id } = body;
//     await connect();
//     if (!id) {
//       return new NextResponse(JSON.stringify({ message: "id is not found." }), {
//         status: 400,
//       });
//     }

//     if (!Types.ObjectId.isValid(id)) {
//       return new NextResponse(JSON.stringify({ message: "id is not valid." }), {
//         status: 400,
//       });
//     }

//     const deletedUser = await User.findOneAndDelete({ _id: new ObjectId(id) });

//     if (!deletedUser) {
//       return new NextResponse(JSON.stringify({ message: "User not found" }), {
//         status: 404,
//       });
//     }

//     return new NextResponse(JSON.stringify(deletedUser), { status: 200 });
//   } catch (error: any) {
//     return new NextResponse(
//       JSON.stringify({ message: "Error in deleting user " + error.message }),
//       { status: 500 }
//     );
//   }
// };

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await connect();
    if (!id) {
      return new NextResponse(JSON.stringify({ message: "id is not found." }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ message: "id is not valid." }), {
        status: 400,
      });
    }

    const deletedUser = await User.findOneAndDelete({ _id: new ObjectId(id) });

    if (!deletedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(deletedUser), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error in deleting user " + error.message }),
      { status: 500 }
    );
  }
};
