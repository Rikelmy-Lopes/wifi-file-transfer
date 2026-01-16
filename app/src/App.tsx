import { useEffect, useState } from "react";
import "./App.css";
import { startServer, stopServer } from "./utils/server";
import { AppState, getAppState } from "./state/appState";
import { blockDevTools } from "./utils/blockDevTools";
import { MAX_PORT, MIN_PORT } from "./constants/app";

function App() {
  const [port, setPort] = useState(MIN_PORT);
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isServerRunning, setIsServerRunning] = useState(false);
  blockDevTools();

  function onStartServer() {
    if (isServerRunning) return;
    if (!isPortInRange(port)) return;

    startServer(port);
    setIsServerRunning(true);
  }

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
        <span>Servidor rodando em: </span>
        <a href={link} target="_blank">
          {link}
        </a>
      </div>
    );
  }

  function validatePort(port: string) {
    const REGEX_ONLY_NUMBERS = /^[0-9]*$/;
    if (REGEX_ONLY_NUMBERS.test(port)) {
      setPort(Number(port));
    }
  }

  function isPortInRange(port: number) {
    return port >= MIN_PORT && port <= MAX_PORT;
  }

  useEffect(() => {
    (async () => {
      const state = await getAppState();
      setAppState(state);
    })();
  }, [isServerRunning]);

  return (
    <main>
      <div className="container">
        <button onClick={onStartServer} disabled={isServerRunning || !isPortInRange(port)}>
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
        <input
          type="text"
          value={port}
          onChange={({ target }) => validatePort(target.value)}
          disabled={isServerRunning}
        />
        {displayServerLink()}
      </div>
    </main>
  );
}

export default App;
