import Comment from "@/app/components/Comment";
import { CommentType } from "@/app/types/Comment";

type Props = {
  comments: CommentType[];
};

const Comments = ({ comments }: Props) => {
  console.log(comments);

  return (
    <div>
      <h2 className="text-md text-center my-8 font-bold text-gray-700">
        Comments
      </h2>
      <ul>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            title={comment.title}
            name={comment.user!.name}
            avatar={comment.user!.image}
            createdAt={comment.createdAt}
          />
        ))}
      </ul>
    </div>
  );
};

export default Comments;
