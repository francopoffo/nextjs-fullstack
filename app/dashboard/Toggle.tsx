"use client";

type Props = {
  onToggle: () => void;
  onDelete: () => void;
};

const Toggle = ({ onToggle, onDelete }: Props) => {
  return (
    <div
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
      onClick={onToggle}
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">Are you sure you want to delete this post?</h2>
        <h3 className="text-sm text-red-500">
          If you do this, the post will be permanently deleted.
        </h3>
        <button
          onClick={onDelete}
          className="bg-red-500 text-sm text-white py-2 px-4 rounded-md"
        >
          Delete post
        </button>
      </div>
    </div>
  );
};

export default Toggle;
