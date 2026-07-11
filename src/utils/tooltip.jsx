import { useEffect, useRef } from "react";

export const TooltipMenu = ({ options, onClose }) => {
  const menuRef = useRef(null);

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
      className="absolute right-0 top-10 z-50 min-w-[140px] rounded-lg bg-neutral-900/95 backdrop-blur-sm p-1 shadow-xl border border-neutral-800 animate-in fade-in zoom-in-95 duration-150"
      onClick={handleMenuInteraction}
    >
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            option.action();
          }}
          className="w-full text-left px-3 py-2 text-xs sm:text-sm text-neutral-200 hover:bg-neutral-800 active:bg-neutral-700 rounded-md transition-colors flex items-center gap-2"
        >
          {option.icon && <span>{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  );
};
