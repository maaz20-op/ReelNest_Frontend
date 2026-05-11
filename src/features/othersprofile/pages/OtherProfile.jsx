import { BorderDiv } from "../../../utils/BorderDiv";

export const OthersProfile = () => {
  return (
    <div className="w-full md:flex gap-12">
      <div className="profile-Card rounded px-6 py-6 w-14/15 md:w-2/5 md:mx-1 mx-auto mt-4 bg-(--bg-secondary)">
        <div className="flex flex-col gap-2  items-center">
          {/* User Profile Img */}
          <div className="profile-img h-40  relative w-40 rounded-full">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://iili.io/BZuCZ57.jpg"
              alt="your profile Img"
            />
          </div>

          {/* user Names */}
          <div className="content flex flex-col  items-center">
            <h1 className="text-2xl font-md text-(--text-primary)">
              {" "}
              Malaika Qamar
            </h1>
            <h2 className="text-xl text-(--text-secondary) lg:text-sm">
              @angel-20
            </h2>
          </div>
          <p className="line-clamp-3 mt-4 text-md text-center text-(--text-secondary)">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab esse
            fugiat, molestiae vitae voluptates nobis dignissimos eaque quia amet
            assumenda, aperiam tempore optio animi? Ipsa quam possimus dolore
            nam minus.
          </p>

          <div className="followers mt-4 flex gap-4">
            {[
              { label: "Friends", count: 1 },
              { label: "Following", count: 1 },
              { label: "Followers", count: 12 },
            ].map(({ label, count }, indx) => (
              <div key={indx} className="flex flex-col items-center gap-2">
                <h2 className="text-(--text-primary)">{label}</h2>
                <h3 className="text-(--text-secondary)">| {count} |</h3>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button className=" px-3 mt-10 rounded-2xl py-2 font-bold bg-blue-600 text-white hover:bg-zinc-800">
              Follow
            </button>
            <button className="bg-white font-bold text-black hover:bg-zinc-200 px-3 mt-10 rounded-2xl py-2 ">
              Message
            </button>
          </div>
        </div>
      </div>
      <div className=" md:flex-1">
        <div className="flex items-center mb-3  justify-center md:gap-23 gap-4 mt-10">
          <span className="bg-red-500 px-3 py-2 font-bold rounded-2xl text-(--text-primary)">
            {" "}
            videos
          </span>
          <span className="bg-red-500 px-3 py-2  font-bold rounded-2xl text-(--text-primary)">
            {" "}
            Images
          </span>
        </div>
        <BorderDiv />
      </div>
    </div>
  );
};
