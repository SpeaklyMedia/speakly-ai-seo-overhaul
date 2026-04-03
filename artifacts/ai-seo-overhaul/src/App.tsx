import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import starfieldLandscape from "@assets/IMG_0228_1775246914295.png";
import starfieldPortrait from "@assets/IMG_0231_1775246914295.png";

function StarfieldBackground() {
  useEffect(() => {
    const root = document.documentElement;
    const mql = window.matchMedia("(min-width: 768px)");

    function update() {
      const url = mql.matches ? starfieldLandscape : starfieldPortrait;
      root.style.setProperty("--starfield-url", `url("${url}")`);
    }

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return null;
}

function App() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <StarfieldBackground />
      <Nav />
      <Home />
    </div>
  );
}

export default App;
