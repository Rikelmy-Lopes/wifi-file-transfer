import { spawn } from "child_process";
import { APP_CWD, APP_WEB_UI } from "./constants.js";

(async () => {
  spawn("npm", ["install"], { shell: true, stdio: "inherit", cwd: APP_CWD });

  spawn("npm", ["install"], { shell: true, stdio: "inherit", cwd: APP_WEB_UI });
})();
