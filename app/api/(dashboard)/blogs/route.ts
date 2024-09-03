import { NextResponse } from "next/server";

// export const GET = async (req: Request) => {
//     try {
//         const {searchParams} = new URL(req.url);
//         const userId = searchParams.get('userId');
//         const categoryId = searchParams.get('categoryId');

//         if (!userId) {
//             return NextResponse.error({
//                 status: 400,
//                 message: 'userId is required'
//             });

//         }
//     }
