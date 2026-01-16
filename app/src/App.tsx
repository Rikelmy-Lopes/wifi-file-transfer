import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Config from "./pages/Config";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </main>
  );
}

export default App;
