import { rm } from "fs/promises";
import { RUST_TARGET_PATH } from "../constants.js";

(async () => {
  await rm(RUST_TARGET_PATH, { recursive: true, force: true });
})();