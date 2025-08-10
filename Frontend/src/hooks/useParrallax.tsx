import { useEffect } from "react";

type ParallaxPair = {
  wrapper: React.RefObject<HTMLElement>;
  image: React.RefObject<HTMLElement>;
  d?: number;
};

export function useParallax(pairs: ParallaxPair[]) {
  useEffect(() => {
    function addParallax(wrapper: HTMLElement | null, image: HTMLElement | null, d = 15) {
      if (!wrapper || !image) return;

      function handleMouseMove(e: MouseEvent) {
        if (!wrapper) return;
        const r = wrapper.getBoundingClientRect();
        const x = e.clientX - (r.left + Math.floor(r.width / 2));
        const y = (e.clientY - (r.top + Math.floor(r.height / 2))) / 10;
        if (image) {
          image.style.transform = `translate(${x / d}px, ${y / d}px)`;
        }
      }
      function handleMouseLeave() {
        if (image) {
          image.style.transform = `translate(0px, 0px)`;
        }
      }
      wrapper.addEventListener("mousemove", handleMouseMove);
      wrapper.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup
      return () => {
        wrapper.removeEventListener("mousemove", handleMouseMove);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    const cleanups: Array<() => void> = [];

    pairs.forEach(({ wrapper, image, d }) => {
      cleanups.push(
        addParallax(wrapper.current, image.current, d) || (() => {})
      );
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pairs]);
}