import { spawn } from "child_process";
import { watch, access } from "fs/promises";
import { APP_CWD, APP_WEB_UI, APP_WEB_APP_RESOURCE } from "./constants.js";
const DELAY = 500;

(async () => {
  let child;
  let timeout;

  try {
    await access(APP_WEB_APP_RESOURCE);
  } catch (_) {
    spawn("npm", ["run", "build:no-typecheck"], { shell: true, stdio: "inherit", cwd: APP_WEB_UI });
  }
  
  spawn("npm", ["run", "tauri", "dev"], { shell: true, stdio: "inherit", cwd: APP_CWD });

  let watcher = watch("app/web-ui/src", { recursive: true });

  for await (const _ of watcher) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (child && !child.killed) child.kill();
      child = spawn("npm", ["run", "build:no-typecheck"], { shell: true, stdio: "inherit", cwd: APP_WEB_UI });
    }, DELAY);
  }
})();