"use client";

import Image from "next/image";
import Link from "next/link";

import React from "react";

export type Props = {
  id: string;
  avatar: string;
  name: string;
  postTitle: string;
  comments?: {
    createdAt: string;
    id: string;
    title: string;
    postId: string;
    userId: string;
  }[];
};

export default function ({ id, avatar, name, postTitle, comments }: Props) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          width={64}
          height={64}
          src={avatar}
          alt={`Picture of ${name}.`}
          className="rounded-full"
          priority
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">{`${comments?.length} Comments`}</p>
        </Link>
      </div>
    </div>
  );
}
