"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Post from "@/app/components/Post";
import AddCommentForm from "@/app/components/AddCommentForm";
import { PostType } from "@/app/types/Post";

import React from "react";
import Comments from "./Comments";

type URL = {
  params: {
    slug: string;
  };
};

const fetchPostDetail = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

const PostDetail = (url: URL) => {
  const { data, isLoading, error } = useQuery<PostType>({
    queryFn: () => fetchPostDetail(url.params.slug),
    queryKey: ["post-detail"],
  });

  if (isLoading)
    return (
      <p className="my-8 flex justify-center text-lg font-bold text-gray-700">
        Loading the page...
      </p>
    );

  if (error)
    return (
      <p className="my-8 flex justify-center text-lg font-bold text-gray-700">
        We were not able to find a post for this url.
      </p>
    );

  return (
    <div>
      <Post
        key={data!.id}
        id={data!.id}
        name={data!.user.name}
        avatar={data!.user.image}
        postTitle={data!.title}
        comments={data!.comments}
      />
      <AddCommentForm slug={url.params.slug} />
      {data?.comments ? (
        <Comments comments={data!.comments!} />
      ) : (
        <p className="my-8 flex justify-center text-lg font-bold text-gray-700">
          No comments for this post. Be the first one to do it!
        </p>
      )}
    </div>
  );
};

export default PostDetail;
