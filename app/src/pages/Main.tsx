import { useEffect, useState } from "react";
import { startServer, stopServer } from "../utils/server";
import { AppState, getAppState } from "../state/appState";
import { blockDevTools } from "../utils/blockDevTools";
import { configManager } from "../config/ConfigManager";
import { createWebviewWindow } from "../utils/window";

function Main() {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isServerRunning, setIsServerRunning] = useState(false);
  blockDevTools();

  async function onStartServer() {
    if (isServerRunning) return;
    const config = await configManager.getCurrent();

    startServer(config.getServerPort());
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

  async function openConfig() {
    const [_window, webview] = await createWebviewWindow("/config", "Configuração", "config");
    webview.show();
  }

  useEffect(() => {
    (async () => {
      const state = await getAppState();
      setAppState(state);
    })();
  }, [isServerRunning]);

  useEffect(() => {
    (async () => {
      await configManager.load();
    })();
  }, []);

  return (
    <>
      <div className="container">
        <button onClick={onStartServer} disabled={isServerRunning}>
          Iniciar Servidor
        </button>
        <button
          onClick={() => {
            stopServer();
            setIsServerRunning(false);
          }}
          disabled={!isServerRunning}
        >
          Parar Servidor
        </button>
        <button onClick={openConfig} disabled={isServerRunning}>
          Configuração
        </button>
      </div>
      {displayServerLink()}
    </>
  );
}

export default Main;
