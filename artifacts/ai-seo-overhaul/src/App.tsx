import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Nav />
      <Home />
    </div>
  );
}

export default App;
