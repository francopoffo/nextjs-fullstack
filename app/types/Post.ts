export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    title: string;
    postId: string;
    userId: string;
  }[];
};
