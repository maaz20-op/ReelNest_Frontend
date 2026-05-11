import { Icon } from "lucide-react";
import { Icons } from "../assets/icons";
import { contextThemeSetup } from "../utils/contextSetup";
import { redirect, useNavigate } from "react-router-dom";

const IconsContent = [
  { text: "Home", icon: Icons.HomeIcon, redirect: "/" },
  { text: "Upgrade", icon: Icons.upgrade, redirect: "/upgrade" },
  { text: "", icon: Icons.plusCircle, redirect: "/create/post" },
  { text: "Messages", icon: Icons.message, redirect: "/message" },
  { text: "Profile", icon: Icons.profile, redirect: "/profile" },
];

export const Nav_Actions = () => {
  const { isDark, toggle, iconsColor } = contextThemeSetup();
  const navigate = useNavigate();

  return (
    <div className="w-full h-15   bg-(--bg-primary)  flex lg:flex-col lg:border-l lg:py-30 lg:min-h-0 lg:border-(--border-color)  lg:justify-start lg:gap-8 gap-4 px-2 py-3 justify-between ">
      {IconsContent.map(({ text, icon: Icon, redirect }, indx) => (
        <div className="flex flex-col items-center " key={indx}>
          <Icon
            onClick={() => navigate(redirect)}
            color={iconsColor}
            size={35}
          />
          <h1 className="text-[10px] text-(--text-primary)">{text}</h1>
        </div>
      ))}
    </div>
  );
};
