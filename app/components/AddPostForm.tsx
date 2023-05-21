"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AddPostForm = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const { mutate } = useMutation(
    async (title: String) => await axios.post("/api/posts/posts", { title })
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
    setIsDisabled(false);
  };

  return (
    <form onSubmit={submitPost}>
      <div className="flex flex-col my-2">
        <textarea
          onChange={(e) => {
            setTitle(e.target.value);
            if (title.trim() == "") {
              setIsDisabled(true);
            } else {
              setIsDisabled(false);
            }
          }}
          name="title"
          value={title}
          placeholder="Write your post here"
          className="text-md p-4 rounded-md my-4"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >
          {title.length}/300
        </p>
        <button
          disabled={isDisabled}
          className={`text-sm text-white py-2 px-4 rounded-md text-center ${
            isDisabled ? "bg-gray-500" : "bg-teal-500"
          }`}
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default AddPostForm;
