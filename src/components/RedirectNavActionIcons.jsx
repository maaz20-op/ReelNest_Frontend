import { Icons } from "../assets/icons";
import { contextThemeSetup } from "../utils/contextSetup";

import { redirect, useNavigate } from "react-router-dom";

const IconsContent = [
  { text: "Home", icon: Icons.HomeIcon, redirect: "/" },
  { text: "Messages", icon: Icons.message, redirect: "/message" },
  { text: "", icon: Icons.plusCircle, redirect: "/create/post" },
  { text: "Upgrade", icon: Icons.upgrade, redirect: "/upgrade" },
  { text: "Profile", icon: Icons.profile, redirect: "/profile" },
];

export const Nav_Actions = () => {
  const { isDark, toggle, iconsColor } = contextThemeSetup();
  const navigate = useNavigate();

  return (
    <div className="w-full  h-full   bg-(--bg-primary) py-1  gap-4 px-2 flex justify-between items-center lg:flex-col lg:h-full lg:border-l lg:py-30 lg:min-h-0 lg:border-(--border-color)  lg:justify-start">
      {IconsContent.map(({ text, icon: Icon, redirect }, indx) => (
        <div
          onClick={() => navigate(redirect)}
          className="flex flex-col justify-center  items-center px-3 lg:py-2   rounded-xl hover:bg-(--bg-tertiary)"
          key={indx}
        >
          <Icon color={iconsColor} className="h-5 w-5 lg:h-6 lg:w-6" />
          <h1 className="text-[10px]  lg:text-[12px] text-(--text-primary)">
            {text}
          </h1>
        </div>
      ))}
    </div>
  );
};
