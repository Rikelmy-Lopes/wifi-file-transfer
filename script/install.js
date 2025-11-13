import { spawn } from "child_process";
import { APP_CWD, APP_WEB_UI } from "./constants.js";

(async () => {
  await spawn("npm", ["install"], { shell: true, stdio: "inherit", cwd: APP_CWD });

  await spawn("npm", ["install"], { shell: true, stdio: "inherit", cwd: APP_WEB_UI });
})();
