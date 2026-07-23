import { Icons } from "../../../../assets/icons";

export const CommentTextInput = ({
  setComment,
  comment,
  handleCreateComment,
  iconsColor,
}) => {
  return (
    <div className="h-12   w-full p-2 py-2">
      <form className="flex h-full items-center gap-8   w-full">
        <input
          className="outline-none p-2 text-(--text-primary) rounded-2xl w-2/3 border-2 border-(--border-color)"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
        />
        <Icons.send
          onClick={handleCreateComment}
          color={iconsColor}
          className="hover:scale-110"
          size={30}
        />
      </form>
    </div>
  );
};
