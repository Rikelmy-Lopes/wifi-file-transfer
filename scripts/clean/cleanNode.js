import { rm } from "node:fs/promises";
import { NODE_MODULES_APP, NODE_MODULES_WEBUI } from "../constants.js";

(async () => {
  await Promise.all([
    rm(NODE_MODULES_APP, { recursive: true, force: true }),
    rm(NODE_MODULES_WEBUI, { recursive: true, force: true }),
  ]);
})();
