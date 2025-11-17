mod fs;
mod http;
mod state;
mod utils;
use std::sync::Mutex;

use http::server::{start_server, stop_server};
use state::app_state::get_state;
use tauri::Manager;
use utils::os::get_current_ip;

use crate::state::app_state::AppState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState::default()));
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
