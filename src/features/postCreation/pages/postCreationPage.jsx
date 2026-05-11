import { useRef } from "react";
import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useState } from "react";
import { BorderDiv } from "../../../utils/BorderDiv";

export const PostCreationPage = () => {
  const inputRef = useRef();
  const { iconsColor } = contextThemeSetup();
  const [titleLength, setTitleLength] = useState(0);

  const ActionBtnStyle =
    "flex w-60 justify-center text-(--text-primary) items-center bg-blue-600 p-2 rounded-2xl gap-4";

  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <div className="px-2 py-3 flex flex-col overflow-y-auto  sm:mt-20 lg:mt-0 items-center sm:grid h-full pb-13 sm:grid-rows-[400px_1fr]  lg:grid-rows-1 sm:grid-cols-2 lg:grid-cols-2">
      {/* Upload Preview */}
      <div className=" lg:h-full lg:w-full  flex gap-3 flex-col items-center p-2">
        <h1 className="text-xl text-(--text-primary)">Upload Post</h1>
        <div className="h-80 w-60 sm:h-100 sm:w-60 lg:h-120 lg:w-60 rounded-xl bg-(--bg-tertiary) animate-pulse"></div>
      </div>

      {/* Upload Actions */}
      <div className="lg:h-full lg:w-full  flex gap-3 flex-col items-start p-4">
        <form className="flex flex-col gap-5 " action="">
          <label className="text-(--text-primary)" htmlFor="choosefile">
            Choose From Gallery
          </label>
          <input
            ref={inputRef}
            className="hidden"
            type="file"
            id="choosefile"
            required
          />
          {/* Select File From Gallery */}
          <button onClick={handleClick} className={`${ActionBtnStyle}`}>
            <span>Select the File </span>
            <Icons.File color={iconsColor} />
          </button>

          <label htmlFor="title"></label>
          <h2
            className={`text-sm ${titleLength == 100 ? "text-red-600" : "text-(--text-primary)"}`}
          >
            {titleLength}/100
            <span>{titleLength == 100 ? "   Your React the Limit" : ""}</span>
          </h2>
          <textarea
            onChange={(e) => setTitleLength(e.target.value.length)}
            placeholder="Write your Title..."
            rows={3}
            maxLength={100}
            required
            className=" p-3 lg:w-70 xl:w-100 border-4 outline-none text-(--text-primary) account-settings border-(--border-color) rounded-lg resize-none"
            name="title"
            id="title"
          ></textarea>

          <BorderDiv />

          <h1 className=" text-(--text-primary)">Try AI Post Creation</h1>

          <button
            onClick={(e) => e.preventDefault()}
            className={`${ActionBtnStyle}`}
          >
            <span>Create with AI</span> <Icons.MagicStick color={iconsColor} />
          </button>

          <button className="px-3 py-3 flex gap-2 justify-center mt-10 items-center bg-red-500 rounded">
            <span className="text-(--text-primary) font-bold">
              {" "}
              Upload Post
            </span>
            <Icons.upload color={iconsColor} />
          </button>
        </form>
      </div>
    </div>
  );
};
