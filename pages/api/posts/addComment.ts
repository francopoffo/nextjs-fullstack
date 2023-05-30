import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client.tsx";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth].js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign in to create a post." });
    }

    const { title, postId } = req.body.data;

    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });
    //Check title
    if (title.length > 100) {
      return res
        .status(403)
        .json({ message: "Please write a shorter comment" });
    }

    if (!title.length) {
      return res.status(403).json({ message: "Please do not leave it empty." });
    }

    //Create Post
    try {
      const result = await prisma.comment.create({
        data: {
          title,
          userId: prismaUser!.id,
          postId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" });
    }
  }
}
