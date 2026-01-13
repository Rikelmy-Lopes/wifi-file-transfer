mod constants;
mod fs;
mod http;
mod state;
mod utils;
use std::{env, sync::Mutex};

use http::server::{start_server, stop_server};
use state::app_state::get_state;
use tauri::Manager;
use utils::os::get_current_ip;

use crate::state::app_state::AppState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            /*             let webapp_path = get_webapp_path(&app); */

            let state = Mutex::new(AppState {
                ..AppState::default()
            });

            app.manage(state);
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            start_server,
            stop_server,
            get_current_ip,
            get_state,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
