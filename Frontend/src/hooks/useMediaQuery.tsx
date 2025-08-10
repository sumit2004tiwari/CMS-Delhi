import { useEffect, useState } from "react";

export const useMediaQuery = (query:any, val:any) => {
  const [media, setMedia] = useState();
  const queryStr = `(${query}: ${val}px)`;

  useEffect(() => {
    const mediaWatcher = window.matchMedia(queryStr);

    // @ts-ignore
    mediaWatcher.matches ? setMedia(true) : setMedia(false);

        // @ts-ignore
    function updateMediaWatcher(e) {
          // @ts-ignore
      e.matches ? setMedia(true) : setMedia(false);
    }
    mediaWatcher.addEventListener("change", updateMediaWatcher);

    return function cleanup() {
      mediaWatcher.removeEventListener("change", updateMediaWatcher);
    };
  }, [queryStr]);

  return media;
};