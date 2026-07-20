import { useRef } from "react";
import { contextThemeSetup } from "./contextSetup";

const sizeMap = {
  sm: {
    container: "min-w-[120px] rounded-md p-1",
    button: "px-2 py-1.5 text-xs gap-1.5",
    icon: 14,
  },
  md: {
    container: "min-w-[170px] rounded-lg p-1.5",
    button: "px-3 py-2 text-sm gap-2",
    icon: 16,
  },
  lg: {
    container: "min-w-[220px] rounded-xl p-2",
    button: "px-4 py-3 text-base gap-3",
    icon: 18,
  },
};

export const TooltipMenu = ({ options = [], size = "md", className = "" }) => {
  const menuRef = useRef(null);
  const { iconsColor } = contextThemeSetup();

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className={`
        absolute right-0 top-10
        z-50
        ${currentSize.container}
        bg-(--bg-secondary)/95
        backdrop-blur-xl
        border border-(--border-color)
        shadow-2xl
        animate-in fade-in zoom-in-95 duration-150
        ${className}
      `}
    >
      {options.map(({ action, icon: Icon, label, danger }, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            action?.();
          }}
          className={`
            w-full
            rounded-md
            flex items-center
            ${currentSize.button}
            text-(--text-secondary)
            transition-all duration-150
            hover:bg-(--bg-primary)
            active:scale-[0.98]
            ${danger ? "hover:text-red-500" : "hover:text-(--text-primary)"}
          `}
        >
          {Icon && (
            <Icon
              size={currentSize.icon}
              color={iconsColor}
              className="shrink-0"
            />
          )}

          <span className="truncate">{label}</span>
        </button>
      ))}
    </div>
  );
};
