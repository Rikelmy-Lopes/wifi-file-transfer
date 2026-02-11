import { spawn } from "node:child_process";
import { WEBUI_PATH, APP_PATH } from "./constants.js";

(() => {
  spawn("npm", ["run", "build"], { shell: true, stdio: "inherit", cwd: WEBUI_PATH });
  spawn("npm", ["run", "tauri", "build"], { shell: true, stdio: "inherit", cwd: APP_PATH });
})();
