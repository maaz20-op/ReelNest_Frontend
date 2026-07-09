export const Spinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {/* The Spinner Circle */}
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-(--bg-primary)" />
      <span className="text-gray-500 font-medium">Loading...</span>
    </div>
  );
};
