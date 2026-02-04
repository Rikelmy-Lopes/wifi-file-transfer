import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Configuration from "./pages/Configuration";
import { blockDevTools } from "./utils/blockDevTools";
import { onMainWindowClose } from "./utils/window";

function App() {
  blockDevTools();
  onMainWindowClose();

  return (
    <main>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/config" element={<Configuration />} />
      </Routes>
    </main>
  );
}

export default App;
