import { spawn } from "node:child_process";
import { APP_PATH, WEBAPP_RES_PATH_PROD, WEBUI_PATH } from "./constants.js";
import { killAll } from "./process.js";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

(() => {
  // this folders need to exist to run in development mode
  if (!existsSync(WEBAPP_RES_PATH_PROD)) {
    mkdirSync(WEBAPP_RES_PATH_PROD, { recursive: true });
    writeFileSync(join(WEBAPP_RES_PATH_PROD, "index.html"), "");
  }

  spawn("npm", ["run", "tauri", "dev"], { shell: true, stdio: "inherit", cwd: APP_PATH });

  let child = spawn("npm", ["run", "dev"], { shell: true, cwd: WEBUI_PATH });

  child.stderr.setEncoding("utf-8");
  child.stdout.setEncoding("utf-8");

  child.stdout.pipe(process.stdout);

  child.stderr.on("data", (data) => {
    console.error(data);
    if (data.includes("Port") && data.includes("is already in use")) {
      killAll(process.pid);
    }
  });
})();
