import { useState } from "react";
import { SecuritySection } from "../components/SecuritySection";
import { PersonalizationSection } from "../components/PersonalizationSection";

export const AccountSettings = () => {
  const [active, setActive] = useState(0);

  return (
    <div className=" account-settings min-h-0 h-full px-3 py-3 flex flex-col  w-full ">
      <div className="shrink-0 flex justify-center items-center mt-6 gap-6 md:gap-16 lg:gap-25 w-full px-4 text-sm sm:text-base md:text-lg">
        {["Personalization", "Security", "App"].map((text, indx) => (
          <h1
            onClick={() => setActive(indx)}
            key={indx}
            className={`${
              indx === active
                ? "border-b-3 border-gray-600 font-semibold"
                : "hover:text-gray-400"
            } text-(--text-primary) pb-2 cursor-pointer transition-all duration-200 whitespace-nowrap`}
          >
            {text}
          </h1>
        ))}
      </div>
      <div className="flex-1 account-settings min-h-0 overflow-y-auto">
        {active == 0 && <PersonalizationSection />}
        {active == 1 && <SecuritySection />}
      </div>
    </div>
  );
};
