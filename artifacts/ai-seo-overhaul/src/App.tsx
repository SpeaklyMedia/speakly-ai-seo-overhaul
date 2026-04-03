import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import starfieldLandscape from "@assets/IMG_0228_1775246914295.png";
import starfieldPortrait from "@assets/IMG_0231_1775246914295.png";

function StarfieldBackground() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--starfield-landscape", `url("${starfieldLandscape}")`);
    root.style.setProperty("--starfield-portrait", `url("${starfieldPortrait}")`);
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
