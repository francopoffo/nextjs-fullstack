"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPostType } from "../types/AuthPost";
import Post from "../components/Post";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

const MyPosts = () => {
  const { data, isLoading } = useQuery<AuthPostType>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });

  if (isLoading)
    return (
      <p className="flex justify-center text-lg font-bold text-gray-700">
        Loading the page...
      </p>
    );

  return (
    <div>
      {data?.posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          postTitle={post.title}
          name={data.name}
          avatar={data.image}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default MyPosts;
