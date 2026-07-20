const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-[3px]",
  lg: "w-12 h-12 border-4",
};

export const Loader = ({
  size = "md",
  color = "#ef4444", // default red
  className = "",
}) => {
  return (
    <div
      className={`
        inline-block
        rounded-full
        animate-spin
        border-solid
        border-t-transparent
        ${sizeMap[size] || sizeMap.md}
        ${className}
      `}
      style={{
        borderTopColor: "transparent",
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: color,
      }}
    />
  );
};
