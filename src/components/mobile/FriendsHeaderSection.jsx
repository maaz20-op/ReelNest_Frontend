export const FriendSection = () => {
  return (
    <div className="wrapper lg:hidden">
      <div className="h-30 max-w-full flex  items-center">
        <div className="friends-container w-[95%] mx-auto flex overflow-x-auto  gap-1 px-2 py-3 ">
          {[...Array(14)].map((_, indx) => (
            <div
              key={indx}
              className="friend-card flex gap-1 justify-center items-center flex-col   px-2 py-2 rounded-2xl text-(--text-primary)"
            >
              <div className="h-14 w-14 rounded-full object-cover bg-black">
                <img
                  className="w-full h-full rounded-full"
                  src="https://iili.io/BZuCZ57.jpg"
                  alt="user profile"
                />
              </div>
              <h1 className="text-(--text-secondary)">Malaika</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
