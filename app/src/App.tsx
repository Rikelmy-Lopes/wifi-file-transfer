import { useEffect, useState } from "react";
import "./App.css";
import { startServer, stopServer } from "./utils/server";
import { AppState, getAppState } from "./state/appState";

function App() {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isServerRunning, setIsServerRunning] = useState(false);

  function displayServerLink() {
    if (!isServerRunning) {
      return null;
    }

    if (appState == null) {
      return null;
    }

    const link = `http://${appState.serverIp}:${appState.serverPort}`;

    return (
      <div>
        <span>Server running on: </span>
        <a href={link} target="_blank">
          {link}
        </a>
      </div>
    );
  }

  useEffect(() => {
    (async () => {
      const state = await getAppState();
      setAppState(state);
    })();
  }, [isServerRunning]);

  return (
    <div className="container">
      <button
        onClick={() => {
          startServer();
          setIsServerRunning(true);
        }}
        disabled={isServerRunning}
      >
        Start Server
      </button>
      <button
        onClick={() => {
          stopServer();
          setIsServerRunning(false);
        }}
        disabled={!isServerRunning}
      >
        Stop Server
      </button>
      {displayServerLink()}
    </div>
  );
}

export default App;
