import { spawn } from "child_process";
import { watch, access } from "fs/promises";
import { WEBAPP_RES_PATH, APP_PATH, WEBUI_PATH, WEBUI_SRC_PATH  } from "./constants.js";
const DELAY = 500;

(async () => {
  let child;
  let timeout;

  try {
    await access(WEBAPP_RES_PATH);
  } catch (_) {
    spawn("npm", ["run", "build:no-typecheck"], { shell: true, stdio: "inherit", cwd: WEBUI_PATH });
  }
  
  spawn("npm", ["run", "tauri", "dev"], { shell: true, stdio: "inherit", cwd: APP_PATH });

  let watcher = watch(WEBUI_SRC_PATH, { recursive: true });

  for await (const _ of watcher) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (child && !child.killed) child.kill();
      child = spawn("npm", ["run", "build:no-typecheck"], { shell: true, stdio: "inherit", cwd: WEBUI_PATH });
    }, DELAY);
  }
})();