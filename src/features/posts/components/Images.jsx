import { Icons } from "../../../assets/icons";

export const Images = ({ iconsColor, setCommentsOpen }) => {
  return (
    <div className="posts-container">
      {[...Array(5)].map((_, indx) => (
        <div
          key={indx}
          className="video/image-card py-6 flex flex-col gap-2 w-full px-2 "
        >
          {/* Profile image - username */}
          <div className="profile-info flex gap-2 ">
            <div className="profile-img  h-10 w-10">
              <img
                className="w-full object-cover h-full rounded-full"
                src="https://iili.io/BZuCZ57.jpg"
                alt="your profile"
              />
            </div>
            <div className="user-name flex flex-col leading-4 justify-center">
              <h1 className="text-(--text-primary) text-sm">Malaika_Qamar</h1>
              <h2 className="text-(--text-secondary) text-sm">username</h2>
            </div>
          </div>

          {/* Image - video content */}
          <div className="video/image-container  w-full ">
            <img
              className="w-full aspect-square object-cover  h-full "
              src="https://iili.io/BZuCZ57.jpg"
              alt="your profile"
            />
          </div>
          {/* Like comments Button */}
          <div className="action-icons px-2 mt-2 flex justify-between">
            <div className="flex gap-8">
              <Icons.heart color={iconsColor} size={23} />
              <Icons.comments
                onClick={() => setCommentsOpen(true)}
                color={iconsColor}
                size={23}
              />
              <Icons.send color={iconsColor} size={23} />
            </div>
            <Icons.save color={iconsColor} size={23} />
          </div>

          {/* Likes and  video title */}
          <div className="mt-4 text-sm">
            <div className="text-(--text-secondary) ">
              Liked by{" "}
              <span className="text-(--text-primary)">maaz, sidhu</span> and{" "}
              <span className="text-(--text-primary)">621 others</span>
            </div>
            <div className=" flex gap-1  flex-col sm:flex-row text-(--text-primary) ">
              <p>malaika_posted: </p>
              <p className="text-(--text-secondary) ">
                I am gonig to marry with Maaz
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
