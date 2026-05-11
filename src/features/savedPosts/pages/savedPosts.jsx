export const SavedPost = () => {
  return (
    <div className="p-3 min-h-0 flex flex-col">
      <h1 className="text-(--text-primary) mt-8 text-center text-xl">
        Saved Posts
      </h1>

      {/* Images videos toggle */}
      <div className="flex items-center mb-3  justify-center md:gap-23 gap-30 mt-10">
        <span className="bg-red-500 px-3 py-2 font-bold rounded-2xl text-(--text-primary)">
          {" "}
          videos
        </span>
        <span className="bg-red-500 px-3 py-2  font-bold rounded-2xl text-(--text-primary)">
          {" "}
          Images
        </span>
      </div>

      <div className="min-h-0 overflow-y-auto w-full h-full"></div>
    </div>
  );
};
