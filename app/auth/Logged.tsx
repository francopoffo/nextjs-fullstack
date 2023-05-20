"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  image: string | null | undefined;
};

const Logged = ({ image }: User) => {
  let userImage;

  if (image) {
    userImage = image;
  } else {
    userImage = "/user.png";
  }

  return (
    <li className="flex gap-8 items-center">
      <button
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <Link href="/dashboard">
        <Image
          width={64}
          height={64}
          src={userImage}
          alt="Picture of the logged user."
          className="w-14 rounded-full"
          priority
        />
      </Link>
    </li>
  );
};

export default Logged;
