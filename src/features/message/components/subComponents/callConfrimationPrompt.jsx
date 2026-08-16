import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../../components/reusableComponents/Avatar";
import { Button } from "../../../../components/reusableComponents/Button";

export const CallConfirmationPrompt = ({
  user,
  setIsCallPromptOpen,
  handleStartVideoCall,
}) => {
  const navigate = useNavigate();

  return (
    <div className="absolute z-100 bg-(--bg-secondary) rounded-xl lg:w-[30%] w-[70%] p-3 top-[30%] lg:top-[30%] left-1/2 -translate-x-1/2">
      <div className="flex flex-col justify-center items-center gap-3">
        <Avatar size="md" src={user?.profileImage} />
        <div className="flex flex-col gap-1 items-center justify-center">
          <h1 className="text-(--text-primary) text-sm">{user?.fullname}</h1>
          <h2 className="text-(--text-secondary) text-xs">@{user?.username}</h2>
        </div>
        <h1 className="text-center text-(--text-primary)">
          You want to Start video Call with {user?.fullname}?
        </h1>
        <div className="flex gap-2">
          <Button
            fnc={() => {
              handleStartVideoCall();
              setIsCallPromptOpen(false);
            }}
            content="Start Call"
            otherStyles="bg-green-600 text-(--text-primary)"
          />
          <Button
            fnc={() => {
              navigate("/message");
              setIsCallPromptOpen(false);
            }}
            content="Go Back"
            otherStyles="bg-red-700 text-(--text-primary)"
          />
        </div>
      </div>
    </div>
  );
};
