const avatarsSize = {
  sm: "h-8  w-8",
  md: "h-10  w-10",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
};

export const Avatar = ({
  size,
  src,
  fn,
  skeleton,
  bg = "bg-(--bg-secondary)",
}) => {
  return (
    <div
      onClick={fn}
      className={`"profile-img rounded-full flex shrink-0  ${avatarsSize[size] && size ? avatarsSize[size] : avatarsSize["sm"]}`}
    >
      {skeleton ? (
        <div className={`h-full w-full rounded-full ${bg}  animate-pulse`} />
      ) : (
        <img
          className="h-full object-cover w-full rounded-full"
          src={src ? src : "https://iili.io/BZuCZ57.jpg"}
          alt=""
        />
      )}
    </div>
  );
};
