import { spawn } from "node:child_process";
import { APP_PATH, WEBUI_PATH } from "./constants.js";

(() => {
  spawn("npm", ["install"], { shell: true, stdio: "inherit", cwd: APP_PATH });
  spawn("npm", ["install"], { shell: true, stdio: "inherit", cwd: WEBUI_PATH });
})();
