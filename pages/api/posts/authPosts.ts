import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth].js";
import prisma from "../../../prisma/client.tsx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please sign in." });
    }

    //Get auth user psots
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      });

      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while fetching posts" });
    }
  }
}
