export const useUpdateUiAfterDeletePost = ({ setApiData, postId, posts }) => {
  const deletedPost = posts.find(
    (post) => post?._id?.toString() === postId?.toString(), // find deleted post
  );

  const Index = posts.findIndex(
    (post) => post?._id?.toString() === postId?.toString(), // find Deleted Post Index
  );

  const updatePostsUi = () => {
    setApiData((prev) =>
      prev.filter((post) => post?._id?.toString() !== postId?.toString()),
    );
  };
  const rollBack = () => {
    setApiData((prev) => {
      return prev.toSpliced(Index, 0, deletedPost);
    });
  };
  return { updatePostsUi, rollBack };
};
