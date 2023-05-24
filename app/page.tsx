"use client";

import axios from "axios";
import AddPostForm from "./components/AddPostForm";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostType } from "./types/Post";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

const Home = () => {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) return error;
  if (isLoading)
    return (
      <p className="flex justify-center text-lg font-bold text-gray-700">
        Loading the page...
      </p>
    );

  return (
    <main>
      <AddPostForm />
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
        />
      ))}
    </main>
  );
};

export default Home;
