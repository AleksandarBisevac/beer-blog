import { useRef, useEffect } from "react";

const useSticky = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const currentValue = ref.current;
    // Create an intersection observer to detect when the component is scrolled to the top of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Make the component sticky when it is scrolled to the top of the viewport
          currentValue?.classList.add("sticky");
        } else {
          // Remove the sticky class when the component is not at the top of the viewport
          currentValue?.classList.remove("sticky");
        }
      },
      { threshold: 0 }
    );

    // Start observing the component
    if (currentValue) {
      observer.observe(currentValue);
    }

    // Clean up the intersection observer when the component is unmounted
    return () => {
      if (currentValue) {
        observer.unobserve(currentValue);
      }
    };
  }, [ref]);
};

export default useSticky;
