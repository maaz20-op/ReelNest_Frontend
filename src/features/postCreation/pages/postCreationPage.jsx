import { useRef } from "react";
import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useState } from "react";
import { BorderDiv } from "../../../utils/BorderDiv";
import { useCreatePostMutation } from "../../../services/posts/post";
import { Loader } from "../../../components/reusableComponents/Loader";
import { useToastContext } from "../../../contexts/toast";

export const PostCreationPage = () => {
  const inputRef = useRef(null);
  const submitBtnRef = useRef(null);
  const { iconsColor } = contextThemeSetup();

  const [title, setTitle] = useState("");
  const [imgUrl, setImgSrc] = useState("");
  const [videoUrl, setVideoSrc] = useState("");
  const [file, setFile] = useState({});
  const { showToast, isSuccessMsg } = useToastContext();

  const [createPost, { isLoading, data, error }] = useCreatePostMutation();
  const ActionBtnStyle =
    "flex w-60 justify-center text-(--text-primary) items-center bg-blue-600 p-2 rounded-2xl gap-4";

  const handleOpenGallery = async (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    console.log("cliked submit");
    formData.append("media", file);
    formData.append("title", title);

    try {
      await createPost(formData);
      setImgSrc("");
      setVideoSrc("");
      setTitle("");
      showToast("Post Uploaded!");
    } catch (err) {
      console.error(err);
      showToast("Failed to Upload Post");
    }
  };

  return (
    <div className="px-2 py-3 flex flex-col overflow-y-auto  sm:mt-20 lg:mt-0 items-center sm:grid h-full pb-13 sm:grid-rows-[400px_1fr]  lg:grid-rows-1 sm:grid-cols-2 lg:grid-cols-2">
      {/* Upload Preview */}
      <div className=" lg:h-full lg:w-full  flex gap-3 flex-col items-center p-2">
        <h1 className="text-xl text-(--text-primary)">Upload Post</h1>
        <div
          className={`${!imgUrl && "animate-pulse"} h-80 w-60 flex justify-center items-center sm:h-100 sm:w-60 lg:h-120 lg:w-60 rounded-xl bg-(--bg-tertiary) `}
        >
          {imgUrl && <img src={imgUrl} className="object-cover" />}
          {videoUrl && <video src={videoUrl} controls />}
        </div>
      </div>

      {/* Upload Actions */}
      <div className="lg:h-full lg:w-full  flex gap-3 flex-col items-start p-4">
        <div className="flex flex-col gap-5 ">
          <label className="text-(--text-primary)" htmlFor="choosefile">
            Choose From Gallery
          </label>
          <input
            ref={inputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              if (
                file.type.startsWith("image/") ||
                file.type.startsWith("video/")
              ) {
                const reader = new FileReader();

                reader.onload = function (e) {
                  console.log(e.target.result);
                  file.type.startsWith("video/")
                    ? setVideoSrc(e.target.result)
                    : setImgSrc(e.target.result);

                  setFile(file);
                };

                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
            type="file"
            id="choosefile"
            required
          />
          {/* Select File From Gallery */}
          <button onClick={handleOpenGallery} className={`${ActionBtnStyle}`}>
            <span>Select the File </span>
            <Icons.File color={iconsColor} />
          </button>

          <label htmlFor="title"></label>
          <h2
            className={`text-sm ${title.length == 100 ? "text-red-600" : "text-(--text-primary)"}`}
          >
            {title.length}/100
            <span>{title.length == 100 ? "   You Reach the Limit" : ""}</span>
          </h2>
          <textarea
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write your Title..."
            rows={3}
            maxLength={100}
            value={title}
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

          <button
            ref={submitBtnRef}
            disabled={isLoading}
            onClick={handleSubmit}
            className="px-3 py-3 flex gap-2 justify-center mt-10 items-center bg-red-500 rounded"
          >
            <span className="text-(--text-primary) font-bold">
              {" "}
              Upload Post
            </span>
            {isLoading ? (
              <Loader color="white" size="sm" />
            ) : (
              <Icons.upload color={iconsColor} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
