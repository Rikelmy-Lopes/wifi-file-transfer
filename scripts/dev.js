import { spawn } from "node:child_process";
/* import { watch } from "fs/promises"; */
import { APP_PATH, WEBUI_PATH } from "./constants.js";
import { killAll } from "./process.js";
/* const DELAY = 500; */

const env = { ...process.env, NODE_ENV: "development" };

(async () => {
  /*   let child;
  let timeout; */
  spawn("npm", ["run", "tauri", "dev"], { shell: true, stdio: "inherit", cwd: APP_PATH, env });

  let child2 = spawn("npm", ["run", "dev"], { shell: true, cwd: WEBUI_PATH, env });

  child2.stderr.setEncoding("utf-8");
  child2.stdout.setEncoding("utf-8");

  child2.stdout.on("data", (data) => {
    console.log(data);
  });

  child2.stderr.on("data", (data) => {
    console.error(data);
    if (data.includes("Port") && data.includes("is already in use")) {
      killAll(process.pid);
    }
  });

  /*   let watcher = watch(WEBUI_SRC_PATH, { recursive: true }); */

  /*   for await (const _ of watcher) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (child && !child.killed) child.kill();
      child = spawn("npm", ["run", "dev:build:no-typecheck"], { shell: true, stdio: "inherit", cwd: WEBUI_PATH, env });
    }, DELAY);
  } */
})();
