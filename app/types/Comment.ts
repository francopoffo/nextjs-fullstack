export type CommentType = {
  createdAt: string;
  id: string;
  title: string;
  postId: string;
  userId: string;
  user?: {
    email: string;
    name: string;
    image: string;
  };
};
