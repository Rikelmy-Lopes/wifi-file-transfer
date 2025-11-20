import axios from "axios";
import "./App.css";
import { useEffect, useState, type JSX } from "react";
import type { IEntry } from "./types/fs";

function App() {
  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    (async () => {
      let { data } = await axios.get<IEntry[]>("/entries");
      setEntries(data);
    })();
  }, []);

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
            <p>{entry.name}</p>
          </div>
        );
      }

      elements.push(element);
    }

    return elements;
  }

  return (
    <>
      <div>{renderEntryList()}</div>
    </>
  );
}

export default App;
