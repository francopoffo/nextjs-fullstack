import Image from "next/image";

type Props = {
  title: string;
  name: string;
  avatar: string;
  createdAt: string;
};

const Comment = ({ title, avatar, name, createdAt }: Props) => {
  const createdDate = new Date(createdAt);
  const formattedCreatedDate = createdDate.toLocaleString("en-US");

  return (
    <li className="bg-white my-4 p-6 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          width={48}
          height={48}
          src={avatar}
          alt={`Picture of ${name}.`}
          className="rounded-full"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
        <h4>{formattedCreatedDate}</h4>
      </div>
      <div className="my-8">
        <p className="break-all">{title}</p>
      </div>
    </li>
  );
};

export default Comment;
