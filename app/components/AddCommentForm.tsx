"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Props = {
  slug: string;
};

const AddCommentForm = ({ slug }: Props) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  let toastCommentId: string;

  const { mutate } = useMutation(
    async (data: { title: string; postId: string }) =>
      await axios.post("/api/posts/addComment", {
        data,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.remove(toastCommentId);
          toast.error(error?.response?.data.message, { id: toastCommentId });
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["post-detail"]);
        toast.remove(toastCommentId);
        toast.success("Comment has been made 🔥", { id: toastCommentId });
        setTitle("");
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    toastCommentId = toast.loading("Creating your comment", {
      id: toastCommentId,
    });
    const data = { title, postId: slug };
    mutate(data);
  };

  return (
    <form onSubmit={submitComment}>
      <div className="flex flex-col my-2">
        <textarea
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          name="title"
          value={title}
          placeholder="Write your comment here"
          className="text-md p-4 rounded-md my-4"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 100 ? "text-red-700" : "text-gray-700"
          }`}
        >
          {title.length}/100
        </p>
        <button
          className="text-sm text-white py-2 px-4 rounded-md text-center bg-teal-500"
          type="submit"
        >
          Send comment
        </button>
      </div>
    </form>
  );
};

export default AddCommentForm;
