import React from "react";

export const Chat_Msg = () => {
  return (
    <div className="main-msg-screen flex flex-col ">
      {[...Array(12)].map((_, indx) => (
        <React.Fragment key={indx}>
          <p className="left px-2 py-2 max-w-[60%] text-(--text-primary) bg-(--bg-tertiary) w-fit rounded-r-2xl">
            Hi this is Malaika{" "}
          </p>
          <p className="right px-2 ml-auto py-2 max-w-[60%] text-black bg-red-400  w-fit rounded-r-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            sunt. Sunt, quam nemo repellendus placeat ipsa, tempora, fugit quod
            corporis incidunt autem dolorum atque recusandae unde ipsam rem
            pariatur quasi.
          </p>
        </React.Fragment>
      ))}
    </div>
  );
};
