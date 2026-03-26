import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // التأثير الفني: الصعود للأعلى بنعومة
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // ده اللي بيخلي الحركة "هادية وجميلة"
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;