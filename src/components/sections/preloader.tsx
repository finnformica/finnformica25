import { useEffect, useState } from "react";
import PixelTransition from "../pixel-transition";
import LoadingGlitch from "../loading-glitch";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPixelActive, setIsPixelActive] = useState(false);
  const [isGlitchActive, setIsGlitchActive] = useState(isLoading);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsGlitchActive(false);
      }, 2500);

      setTimeout(() => {
        setIsPixelActive(true);
        document.body.style.cursor = "default";
      }, 2000);

      setTimeout(() => {
        setIsPixelActive(false);
      }, 3000);
    }
  }, [isLoading]);

  return (
    <>
      <LoadingGlitch isActive={isGlitchActive} />
      <PixelTransition isLoading={isLoading} isActive={isPixelActive} />
    </>
  );
};

export default Preloader;
