import { contextThemeSetup } from "../../utils/contextSetup";

export const VideosImagesToggleTab = ({ setVideoTab }) => {
  const { isDark } = contextThemeSetup();
  return (
    <div className="flex items-center mb-3 w-full justify-center  md:gap-23 gap-4 mt-8">
      {["Images", "Videos"].map((cate, indx) => (
        <span
          key={indx}
          onClick={() => (indx == 0 ? setVideoTab(false) : setVideoTab(true))}
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
  );
};
