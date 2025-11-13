use crate::fs::fs::get_dir_entries;
use crate::state::state::APP_STATE;
use local_ip_address::local_ip;
use rocket::fs::{relative, FileServer};
use rocket::{get, routes, Config};
use std::net::IpAddr;

#[get("/entries")]
fn get_entries() -> String {
    let files = get_dir_entries();

    return serde_json::to_string(&files).unwrap();
}

#[tauri::command]
pub async fn start_server(port: u16) -> () {
    let ip = get_current_ip();

    let config = Config {
        address: Result::expect(ip.parse::<IpAddr>(), "Error converting string to Address!"),
        port: port,
        ..Config::debug_default()
    };

    let result = rocket::custom(&config)
        .mount("/", routes![get_entries])
        .mount("/", FileServer::from(relative!("../web-ui/webapp")))
        .ignite()
        .await;

    let rocket = match result {
        Ok(rocket) => rocket,
        Err(e) => {
            eprintln!("❌ Erro ao inicializar o Rocket: {}", e);
            return ();
        }
    };

    {
        let mut state = APP_STATE.lock().unwrap();
        state.shutdown = Some(rocket.shutdown());
    }

    let _ = rocket.launch().await;
}

#[tauri::command]
pub fn stop_server() -> () {
    let state = APP_STATE.lock().unwrap();

    if let Some(shutdown) = state.shutdown.as_ref() {
        shutdown.clone().notify();
    }
}

#[tauri::command]
pub fn get_current_ip() -> String {
    let ip = local_ip().unwrap().to_string();
    ip
}
