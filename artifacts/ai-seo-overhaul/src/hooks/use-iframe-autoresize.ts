import { useEffect } from "react";

export function useIframeAutoresize() {
  useEffect(() => {
    function postHeight() {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ speaklyWidget: true, height }, "*");
    }

    postHeight();

    const ro = new ResizeObserver(postHeight);
    ro.observe(document.documentElement);

    window.addEventListener("resize", postHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", postHeight);
    };
  }, []);
}
