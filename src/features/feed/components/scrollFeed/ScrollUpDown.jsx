import { Icons } from "../../../../assets/icons";

export const ScrollUpDown = ({ handleGoUp, handleGoDown }) => {
  return (
    <div className="up-down-video-controls lg:flex hidden text-(--text-primary) absolute right-7 gap-4 top-[40%] w-18 flex-col">
      <div
        onClick={handleGoUp}
        className="w-22 flex justify-center items-center gap-2 h-10 p-2 rounded-full text-center bg-(--bg-primary)"
      >
        <span>Up</span>
        <Icons.arrowUp size={20} />
      </div>
      <div
        onClick={handleGoDown}
        className="w-22 gap-2 flex justify-center items-center h-10 p-2 rounded-full bg-(--bg-primary) text-center"
      >
        <span>Down</span>
        <Icons.arrowDown size={20} />
      </div>
    </div>
  );
};
