const loaderSizes = {
  sm: "h-3 w-3 border-2",
  md: "h-5 w-5 border-3",
  lg: "h-8 w-8 border-4",
};

const loaderText = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

export const Spinner = ({ size = "md", text = "md" }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {/* The Spinner Circle */}
      <div
        className={`${loaderSizes[size]}  ${loaderText[text]} animate-spin rounded-full  border-red-500 border-t-(--bg-primary)`}
      />
      <span className="text-gray-500 font-medium">Loading...</span>
    </div>
  );
};
