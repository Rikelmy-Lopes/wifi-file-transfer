import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Configuration from "./pages/Configuration";

function App() {
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
