import axios from "axios";
import "./App.css";
import { useEffect, useRef, useState, type JSX } from "react";
import type { IEntry } from "./types/fs";
import { BrowserHistory } from "./utils/BrowserHistory";

function App() {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [path, setPath] = useState<string>("/");
  const historyRef = useRef(new BrowserHistory("/"));
  const browserHistory = historyRef.current;

  async function fetchEntries() {
    const url = path != "/" ? `/entries?path=${encodeURIComponent(path)}` : "/entries";
    console.log(path);
    let { data } = await axios.get<IEntry[]>(url);
    setEntries(data);
  }

  useEffect(() => {
    fetchEntries();
  }, [path]);

  function renderEntryList() {
    const elements: JSX.Element[] = [];

    for (const entry of entries) {
      let element = null;
      if (entry.isFile) {
        const href = `/download?path=${entry.path}`;
        element = (
          <div>
            <a href={href}> {entry.name} </a>
          </div>
        );
      } else {
        element = (
          <div>
            <p onClick={() => setPath(browserHistory.visit(entry.path))}> {entry.name} </p>
          </div>
        );
      }

      elements.push(element);
    }

    return elements;
  }

  return (
    <>
      <div>
        <p>Caminho atual: {path}</p>
        <button onClick={() => setPath(browserHistory.back(1))}>Voltar</button>
        <button onClick={() => setPath(browserHistory.forward(1))}>Frente</button>
        <div>{renderEntryList()}</div>
      </div>
    </>
  );
}

export default App;
