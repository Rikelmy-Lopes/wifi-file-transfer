import { spawn } from "child_process";
import { watch } from "fs";
import { APP_CWD, APP_WEB_UI } from "./constants.js";
const DELAY = 500;

(async () => {
  let child;
  let timeout;

  await spawn("npm", ["run", "build:no-typecheck"], { shell: true, stdio: "inherit", cwd: APP_WEB_UI });

  await spawn("npm", ["run", "tauri", "dev"], { shell: true, stdio: "inherit", cwd: APP_CWD });

  await watch("app/web-ui/src", { recursive: true }, () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (child && !child.killed) child.kill();
      child = spawn("npm", ["run", "build:no-typecheck"], { shell: true, stdio: "inherit", cwd: APP_WEB_UI });
    }, DELAY);
  });
})();
