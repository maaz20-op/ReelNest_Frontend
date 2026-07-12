import { useEffect, useRef } from "react";
import { contextThemeSetup } from "./contextSetup";

export const TooltipMenu = ({ options, onClose }) => {
  const menuRef = useRef(null);
  const { iconsColor } = contextThemeSetup();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Use capturing phase (true) taaki events background me leak na hon
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [onClose]);

  // Common wrapper function for menu clicks
  const handleMenuInteraction = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-10 z-50 min-w-[140px] rounded-lg bg-(--bg-secondary) backdrop-blur-sm p-1 shadow-xl border border-(--border-color) animate-in fade-in zoom-in-95 duration-150"
      onClick={handleMenuInteraction}
    >
      {Array.isArray(options) &&
        options.map(({ action, icon: Icon, label }, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              action();
            }}
            className={`w-full text-left px-3 py-2 text-xs sm:text-sm text-(--text-secondary) hover:bg-(--bg-primary) ${idx === 0 ? "hover:text-red-600" : "hover:text-green-600"} active:bg-neutral-700 rounded-md transition-colors flex items-center gap-2`}
          >
            {Icon && <Icon size={16} color={iconsColor} />}
            {label}
          </button>
        ))}
    </div>
  );
};
