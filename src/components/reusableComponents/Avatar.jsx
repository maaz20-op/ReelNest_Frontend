const avatarsSize = {
  sm: "h-8  w-8",
  md: "h-10  w-10",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
  full: "h-80 w-80 sm:h-120 sm:w-120 md:w-100 md:h-100 lg:h-125 lg:w-125",
};

export const Avatar = ({
  size,
  src,
  fn,
  skeleton,
  styles,
  bg = "bg-(--bg-secondary)",
}) => {
  return (
    <div
      onClick={fn}
      className={`"profile-img rounded-full flex shrink-0  ${avatarsSize[size] && size ? avatarsSize[size] : avatarsSize["sm"]}`}
    >
      {skeleton ? (
        <div
          className={`h-full w-full rounded-full ${bg} ${styles}  animate-pulse`}
        />
      ) : (
        <img
          className="h-full bg-black object-cover w-full rounded-full"
          src={src ? src : "https://iili.io/BZuCZ57.jpg"}
          alt=""
        />
      )}
    </div>
  );
};
