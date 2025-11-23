import { spawn } from "child_process";
import { APP_PATH, WEBUI_PATH } from "./constants.js";

(async () => {
  spawn("npm", ["install"], { shell: true, stdio: "inherit", cwd: APP_PATH })
  spawn("npm", ["install"], { shell: true, stdio: "inherit", cwd: WEBUI_PATH });
})();
