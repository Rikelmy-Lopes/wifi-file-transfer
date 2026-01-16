import { MAX_PORT, MIN_PORT } from "../constants/app";

export function isPortInRange(port: number) {
  return port >= MIN_PORT && port <= MAX_PORT;
}
