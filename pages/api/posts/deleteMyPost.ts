import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth].js";
import prisma from "../../../prisma/client.tsx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign in to delete a post." });
    }

    const id: any = req.query.id;

    //Create Post
    try {
      const result = await prisma.post.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      console.log(req.query);

      res
        .status(403)
        .json({ err: "Error has occured while deleting the post" });
    }
  }
}
