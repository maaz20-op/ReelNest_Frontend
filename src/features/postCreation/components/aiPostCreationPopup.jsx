import { useState } from "react";
import { Icons } from "../../../assets/icons";
import { contextThemeSetup } from "../../../utils/contextSetup";
import { Loader } from "../../../components/reusableComponents/Loader";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export const AIPostCreationModal = ({
  isOpen,
  onClose,
  onGenerate,
  isAiImageGenerating,
  imgUrl,
}) => {
  const { iconsColor } = contextThemeSetup();
  const [prompt, setPrompt] = useState("");

  if (!isOpen) return null;

  const deleteAiImg = () => {};

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    onGenerate(prompt);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-3 py-5">
      <div
        className="
      relative
      w-full
      max-w-sm
      sm:max-w-md
      md:max-w-lg
      lg:max-w-xl
      xl:max-w-2xl
      2xl:max-w-3xl

      max-h-[95vh]
      overflow-y-auto
      account-settings

      rounded-2xl
      border
      border-(--border-color)
      bg-(--bg-secondary)
      p-4
      sm:p-5
      md:p-6
      lg:p-7
      shadow-2xl
    "
      >
        {/* Close */}

        <button
          onClick={onClose}
          className="
        absolute
        left-3
        top-3
        sm:left-4
        sm:top-4

        rounded-full
        p-2

        hover:bg-(--bg-primary)
        transition
      "
        >
          <Icons.back color={iconsColor} />
        </button>

        <h1 className="text-center text-2xl sm:text-3xl font-bold text-(--accent)">
          AI Post Creator
        </h1>

        <p className="mt-2 text-center text-xs sm:text-sm md:text-base text-(--text-secondary)">
          Describe the image you want ReelNest AI to generate.
        </p>

        {/* Preview */}

        <div
          className="
        mx-auto
        mt-6

        aspect-[9/16]

        w-36
        sm:w-44
        md:w-52
        lg:w-56
        xl:w-64
        2xl:w-72

        overflow-hidden
        rounded-2xl

        border-2
        border-(--accent)

        bg-(--bg-primary)
      "
        >
          {imgUrl ? (
            <img src={imgUrl} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <Icons.MagicStick size={45} color={iconsColor} />

              <p className="px-3 text-center text-xs sm:text-sm text-(--text-secondary)">
                Your AI image will appear here
              </p>
            </div>
          )}
        </div>

        {/* Prompt */}

        <div className="mt-6">
          <label className="mb-2 block text-(--text-primary)">Prompt</label>

          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: A cyberpunk girl standing under neon lights in Tokyo at night, ultra realistic, cinematic lighting..."
            className="
          account-settings

          w-full
          resize-none

          rounded-xl
          border-2
          border-(--border-color)

          bg-(--bg-primary)

          p-3

          text-(--text-primary)
          placeholder:text-(--text-secondary)

          outline-none

          focus:border-(--accent)
        "
          />
        </div>

        {/* Buttons */}

        {imgUrl ? (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              className="
          flex-1
          rounded-xl

          border
          border-(--accent)

          py-3

          bg-red-600
          flex justify-center items-center

          font-semibold

          text-(--accent)

          transition

          hover:bg-(--accent)
          hover:text-white
        "
            >
              <ImCross color={iconsColor} />
            </button>

            <button
              onClick={onClose}
              className="
          flex
          flex-1
          items-center
          justify-center
          gap-2

          rounded-xl

       

          py-3
 bg-green-700
          font-semibold
          text-white

          transition

          hover:opacity-90

          disabled:opacity-70
        "
            >
              <FaCheck color={iconsColor} />
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="
          flex-1
          rounded-xl

          border
          border-(--accent)

          py-3

          font-semibold

          text-(--accent)

          transition

          hover:bg-(--accent)
          hover:text-white
        "
            >
              Cancel
            </button>

            <button
              disabled={isAiImageGenerating}
              onClick={handleGenerate}
              className="
          flex
          flex-1
          items-center
          justify-center
          gap-2

          rounded-xl

          bg-(--accent)

          py-3

          font-semibold
          text-white

          transition

          hover:opacity-90

          disabled:opacity-70
        "
            >
              {isAiImageGenerating ? (
                <>
                  <Loader color="white" size="sm" />
                  Generating...
                </>
              ) : (
                <>
                  Generate
                  <Icons.MagicStick color="white" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
