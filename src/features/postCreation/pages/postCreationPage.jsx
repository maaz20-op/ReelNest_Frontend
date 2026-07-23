import { useRef } from "react";
import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { useState } from "react";
import { BorderDiv } from "../../../utils/BorderDiv";
import { useCreatePostMutation } from "../../../services/posts/post";
import { Loader } from "../../../components/reusableComponents/Loader";
import { useToastContext } from "../../../contexts/toast";
import { AIPostCreationModal } from "../components/aiPostCreationPopup";
import { useGenrateImageWithAiMutation } from "../../../services/Ai-features/Ai-features";

export const PostCreationPage = () => {
  const inputRef = useRef(null);
  const submitBtnRef = useRef(null);
  const { iconsColor } = contextThemeSetup();

  const [title, setTitle] = useState("");
  const [imgUrl, setImgSrc] = useState("");
  const [videoUrl, setVideoSrc] = useState("");
  const [isAIOpen, setIsAIOpen] = useState(false);

  const [file, setFile] = useState({});
  const { showToast, isSuccessMsg } = useToastContext();

  const [createPost, { isLoading, data, error }] = useCreatePostMutation();
  const [
    generateImageWithAi,
    { data: AiimageData, isLoading: isAiImageGenerating },
  ] = useGenrateImageWithAiMutation();

  const ActionBtnStyle =
    "flex w-60 justify-center text-(--text-primary) items-center bg-blue-600 p-2 rounded-2xl gap-4";

  const handleOpenGallery = async (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!title) return;

    const formData = new FormData();
    console.log("cliked submit");
    formData.append("media", file);
    formData.append("title", title);

    formData.append("AIimg", imgUrl);

    if (file?.name || imgUrl) {
      try {
        const res = await createPost(formData).unwrap();
        if (res.success) {
          setImgSrc("");
          setVideoSrc("");
          setFile({});
          setTitle("");
        }
        showToast("Post Uploaded!", true);
      } catch (err) {
        console.error(err);
        showToast("Failed to Upload Post", false);
      }
    }
  };

  const handleGenerateAI = async (prompt) => {
    if (!prompt) return;
    try {
      const res = await generateImageWithAi(prompt).unwrap();
      console.log();
      if (res?.success) {
        setImgSrc(res?.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        file.type.startsWith("video/")
          ? setVideoSrc(e.target.result)
          : setImgSrc(e.target.result);

        setFile(file);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="px-2 py-3 flex flex-col overflow-y-auto account-settings sm:mt-20 lg:mt-0 items-center sm:grid h-full pb-13 sm:grid-rows-[400px_1fr]  lg:grid-rows-1 sm:grid-cols-2 lg:grid-cols-2">
      {/* Upload Preview */}
      <div className=" lg:h-full lg:w-full  flex gap-3 shadow-md flex-col items-center p-2">
        <h1 className="text-xl text-(--text-primary) font-bold">Upload Post</h1>
        <div
          className={`${!imgUrl && "animate-pulse"} h-80 w-60 border-2 shado border-red-600  shadow-md shadow-red-600 flex justify-center items-center sm:h-100 sm:w-60 lg:h-120 lg:w-60 rounded-xl bg-(--bg-tertiary) `}
        >
          {imgUrl && <img src={imgUrl} className="object-cover" />}
          {videoUrl && <video src={videoUrl} controls />}
        </div>
      </div>

      {/* Upload Actions */}
      <div className="lg:h-full lg:w-full  flex gap-3 flex-col items-start p-4">
        <div className="flex flex-col gap-5 ">
          <label
            className="text-(--text-primary) font-bold"
            htmlFor="choosefile"
          >
            Choose From Gallery
          </label>
          <input
            ref={inputRef}
            onChange={handleSelectFile}
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

          <h1 className=" text-(--text-primary) font-bold">
            Try AI Post Creation
          </h1>

          <button onClick={() => setIsAIOpen(true)} className={ActionBtnStyle}>
            <span>Create with AI</span>
            <Icons.MagicStick color={iconsColor} />
          </button>

          <AIPostCreationModal
            isOpen={isAIOpen}
            onClose={() => setIsAIOpen(false)}
            onGenerate={handleGenerateAI}
            isAiImageGenerating={isAiImageGenerating}
            imgUrl={imgUrl}
          />

          <button
            ref={submitBtnRef}
            disabled={isLoading}
            onClick={handleSubmit}
            className="px-3 py-3 flex gap-5 justify-center mt-10 items-center bg-red-600 rounded"
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
