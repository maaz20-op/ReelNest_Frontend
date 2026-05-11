import { useState } from "react";
import { SecuritySection } from "../components/SecuritySection";
import { PersonalizationSection } from "../components/PersonalizationSection";

export const AccountSettings = () => {
  const [active, setActive] = useState(0);

  return (
    <div className=" account-settings min-h-0 h-full px-3 py-3 flex flex-col  w-full ">
      <div className="shrink-0 flex justify-center mt-6 gap-25 w-full ">
        {["Security", "Personalization", "App"].map((text, indx) => (
          <h1
            onClick={() => setActive(indx)}
            key={indx}
            className={`${indx == active ? "border-b-3 border-gray-600" : ""} text-(--text-primary)`}
          >
            {text}
          </h1>
        ))}
      </div>
      <div className="flex-1 account-settings min-h-0 overflow-y-auto">
        {active == 0 && <SecuritySection />}
        {active == 1 && <PersonalizationSection />}
      </div>
    </div>
  );
};
