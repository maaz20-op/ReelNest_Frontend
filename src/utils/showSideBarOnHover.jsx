import { useState, useEffect } from "react";

export const showScrollBarOnHover = (elementRef) => {
  const [isHoverd, setHoverd] = useState(false);

  useEffect(() => {
    console.log("SSSSSSSSSSSSSSSSSSSSSS", elementRef);
    const targetElement = elementRef?.current;

    if (!targetElement) return; // if element ref is null

    const handleMouseEnter = () => setHoverd(true);
    const handleMouseLeave = () => setHoverd(false);

    targetElement.addEventListener("mouseenter", handleMouseEnter);
    targetElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      targetElement.removeEventListener("mouseenter", handleMouseEnter);
      targetElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef]);

  return isHoverd;
};
