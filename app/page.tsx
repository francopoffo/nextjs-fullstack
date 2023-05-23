"use client";

import axios from "axios";
import AddPostForm from "./components/AddPostForm";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) return error;
  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <AddPostForm />
    </main>
  );
};

export default Home;
