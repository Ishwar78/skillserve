import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const scrollToPageTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    /*
     * Page render hone ke baad scroll chale,
     * isliye requestAnimationFrame use kiya hai.
     */
    const animationFrame =
      window.requestAnimationFrame(
        scrollToPageTop
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame
      );
    };
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;