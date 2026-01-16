import { Webview } from "@tauri-apps/api/webview";
import { PhysicalSize, Window } from "@tauri-apps/api/window";

export function createWebviewWindow(path: string, title: string, id: string): Promise<[Window, Webview]> {
  const minSize = new PhysicalSize(400, 300);

  return new Promise((resolve, reject) => {
    const window = new Window(id, { x: 0, y: 0, width: 800, height: 600, title });

    window.once("tauri://created", async function () {
      const webview = new Webview(window, id + "Webview", {
        url: path,
        x: 0,
        y: 0,
        width: 800,
        height: 600,
      });

      webview.once("tauri://error", function (e) {
        reject(e);
      });

      window.onResized(async ({ payload: size }) => {
        await webview.setSize(size);
      });

      window.setMinSize(minSize);

      resolve([window, webview]);
    });

    window.once("tauri://error", function (e) {
      reject(e);
    });
  });
}
