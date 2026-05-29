export const FriendsMsgUI = () => {
  return (
    <div className="flex  flex-col gap-2 mt-5 px-2 py-3">
      {[...Array(20)].map((_, indx) => (
        <div
          key={indx}
          className="msg-div cursor-pointer  flex items-center justify-between hover:bg-(--bg-secondary) gap-3 px-1 py-3 rounded"
        >
          <div className="profile-img h-10 w-10 shrink-0 rounded-full">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://iili.io/BZuCZ57.jpg"
              alt=""
            />
          </div>

          <p className="text-(--text-primary) w-2/3 font-light line-clamp-1">
            Maaz I love you meri jan, this is Malaika Qamar tumhari jan
          </p>
          <div className="flex flex-col gap-1 w-1/6">
            <span className="bg-red-600 flex ml-auto justify-center items-center text-(--text-primary) p-1 h-5 w-5 rounded-full">
              1
            </span>
            <span className="  text-xs text-(--text-muted)">12:00 pm</span>
          </div>
        </div>
      ))}
    </div>
  );
};
