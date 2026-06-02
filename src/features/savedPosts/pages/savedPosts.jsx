import { BorderDiv } from "../../../utils/BorderDiv";
import { contextThemeSetup } from "../../../utils/contextSetup";

export const SavedPost = () => {
  const { isDark } = contextThemeSetup();
  return (
    <div className="p-3 min-h-0 flex flex-col">
      <h1 className="text-(--text-primary) mt-4 text-2xl text-center font-bold">
        Saved Posts
      </h1>

      {/* Images videos toggle */}
      <div className="flex items-center mb-3  justify-center md:gap-23 gap-30 mt-5">
        {["Images", "Videos"].map((cate, indx) => (
          <span
            key={indx}
            className={`${isDark ? "bg-red-500" : "bg-red-200"}
             px-3 py-2 hover:bg-red-500 cursor-pointer 
              transition-all
              duration-300 
              hover:scale-[1.05]
               hover:text-white
                font-medium 
               rounded-2xl 
               text-(--text-primary)`}
          >
            {cate}
          </span>
        ))}
      </div>
      <BorderDiv />
      <div className="min-h-0 overflow-y-auto w-full h-full"></div>
    </div>
  );
};
