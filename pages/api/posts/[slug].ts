import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client.tsx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const slug = req.query.slug;

    if (typeof slug != "string") {
      return res.status(403).json({
        err: "Error has occured while fetching the post. Check the url.",
      });
    }

    //Get post detail
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: slug,
        },
        include: {
          user: true,
          hearts: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
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
